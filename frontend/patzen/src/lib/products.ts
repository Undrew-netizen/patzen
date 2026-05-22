export type Product = {
	id: string;
	name: string;
	category: string;
	price: number;
	description: string;
	imageUrl?: string;
	rating?: number;
	badge?: string;
	stock?: number;
};

const fallbackProducts: Product[] = [
	{
		id: "sample-copper-elbow",
		name: "15mm Copper Elbow Pack",
		category: "Fittings",
		price: 18.9,
		description: "Box of 25 copper elbows for reliable pipe turns.",
		rating: 4.9,
		badge: "Bulk value",
		stock: 42,
	},
	{
		id: "sample-shower-pump",
		name: "High-flow Shower Pump",
		category: "Pumps",
		price: 149,
		description: "Quiet booster pump for better bathroom water pressure.",
		rating: 4.8,
		badge: "Pro pick",
		stock: 11,
	},
	{
		id: "sample-waste-kit",
		name: "PVC Waste Pipe Kit",
		category: "Drainage",
		price: 34.5,
		description: "Ready-to-fit 40mm waste pipe kit with core connectors.",
		rating: 4.7,
		badge: "Ready to fit",
		stock: 27,
	},
	{
		id: "sample-ball-valve",
		name: "Quarter-turn Ball Valve",
		category: "Valves",
		price: 12.8,
		description: "Brass isolation valve with smooth quarter-turn action.",
		rating: 4.8,
		badge: "In stock",
		stock: 64,
	},
	{
		id: "sample-pipe-cutter",
		name: "Pipe Cutter Pro 42mm",
		category: "Tools",
		price: 42,
		description: "Clean cuts on copper, PVC, and PEX up to 42mm.",
		rating: 4.6,
		badge: "Best seller",
		stock: 19,
	},
	{
		id: "sample-ptfe-tape",
		name: "PTFE Tape Contractor Box",
		category: "Sealants",
		price: 21.4,
		description: "Box of 12 sealing tape rolls for everyday installs.",
		rating: 4.9,
		badge: "Jobsite pack",
		stock: 53,
	},
];

const apiBaseUrl = import.meta.env.VITE_API_URL ?? "";

function asRecord(value: unknown): Record<string, unknown> | null {
	return typeof value === "object" && value !== null ? (value as Record<string, unknown>) : null;
}

function firstString(record: Record<string, unknown>, keys: string[], fallback = "") {
	for (const key of keys) {
		const value = record[key];
		if (typeof value === "string" && value.trim()) {
			return value;
		}
		if (typeof value === "number") {
			return String(value);
		}
	}

	return fallback;
}

function firstNumber(record: Record<string, unknown>, keys: string[], fallback = 0) {
	for (const key of keys) {
		const value = record[key];
		if (typeof value === "number" && Number.isFinite(value)) {
			return value;
		}
		if (typeof value === "string") {
			const parsed = Number(value.replace(/[^0-9.-]/g, ""));
			if (Number.isFinite(parsed)) {
				return parsed;
			}
		}
	}

	return fallback;
}

function normalizeProduct(value: unknown, index: number): Product | null {
	const record = asRecord(value);
	if (!record) {
		return null;
	}

	const name = firstString(record, ["name", "title", "productName"]);
	if (!name) {
		return null;
	}

	return {
		id: firstString(record, ["id", "_id", "sku", "slug"], `product-${index}`),
		name,
		category: firstString(record, ["category", "type", "department"], "General"),
		price: firstNumber(record, ["price", "unitPrice", "amount"]),
		description: firstString(record, ["description", "details", "summary"], "Reliable plumbing supply for everyday jobs."),
		imageUrl: firstString(record, ["imageUrl", "image", "thumbnail", "photo"]),
		rating: firstNumber(record, ["rating", "stars"], 0) || undefined,
		badge: firstString(record, ["badge", "tag", "label"]),
		stock: firstNumber(record, ["stock", "quantity", "inventory"], 0) || undefined,
	};
}

function extractProducts(payload: unknown) {
	if (Array.isArray(payload)) {
		return payload;
	}

	const record = asRecord(payload);
	if (!record) {
		return [];
	}

	for (const key of ["products", "data", "items", "results"]) {
		const value = record[key];
		if (Array.isArray(value)) {
			return value;
		}
	}

	return [];
}

export async function fetchProducts(): Promise<{ products: Product[]; fromFallback: boolean }> {
	try {
		const response = await fetch(`${apiBaseUrl}/api/products`);
		if (!response.ok) {
			throw new Error(`Products request failed with ${response.status}`);
		}

		const payload: unknown = await response.json();
		const products = extractProducts(payload)
			.map((item, index) => normalizeProduct(item, index))
			.filter((product): product is Product => Boolean(product));

		if (products.length === 0) {
			throw new Error("Products response did not include products");
		}

		return { products, fromFallback: false };
	} catch (error) {
		console.warn(error);
		return { products: fallbackProducts, fromFallback: true };
	}
}

export function formatPrice(price: number) {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(price);
}
