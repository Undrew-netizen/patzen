import { useEffect, useMemo, useState } from "react";
import { FaArrowRight, FaFilter, FaSearch, FaStar, FaWrench } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { fetchProducts, formatPrice } from "../lib/products";
import type { Product } from "../lib/products";

const baseFilters = ["All"];

export default function Shop() {
	const [products, setProducts] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [fromFallback, setFromFallback] = useState(false);
	const [activeFilter, setActiveFilter] = useState("All");
	const [query, setQuery] = useState("");
	const { addItem } = useCart();

	useEffect(() => {
		let isMounted = true;

		fetchProducts().then((result) => {
			if (!isMounted) {
				return;
			}

			setProducts(result.products);
			setFromFallback(result.fromFallback);
			setIsLoading(false);
		});

		return () => {
			isMounted = false;
		};
	}, []);

	const filters = useMemo(() => {
		const categories = Array.from(new Set(products.map((product) => product.category).filter(Boolean)));
		return [...baseFilters, ...categories];
	}, [products]);

	const visibleProducts = useMemo(() => {
		const normalizedQuery = query.trim().toLowerCase();

		return products.filter((product) => {
			const matchesFilter = activeFilter === "All" || product.category === activeFilter;
			const matchesQuery =
				!normalizedQuery ||
				product.name.toLowerCase().includes(normalizedQuery) ||
				product.category.toLowerCase().includes(normalizedQuery) ||
				product.description.toLowerCase().includes(normalizedQuery);

			return matchesFilter && matchesQuery;
		});
	}, [activeFilter, products, query]);

	return (
		<section className="bg-slate-50 text-slate-950">
			<div className="bg-blue-900 px-6 py-12 text-white lg:px-10">
				<div className="mx-auto max-w-7xl">
					<p className="text-sm font-bold uppercase text-green-400">Shop</p>
					<div className="mt-3 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
						<div>
							<h1 className="font-['Inter'] text-4xl font-bold sm:text-5xl">Plumbing supplies that work hard</h1>
							<p className="mt-4 max-w-2xl text-lg leading-8 text-blue-100">Browse backend-powered products, add items to your cart, and keep your order saved while you shop.</p>
						</div>
						<div className="flex min-h-12 w-full items-center gap-3 rounded-md bg-white px-4 text-slate-800 lg:max-w-sm">
							<FaSearch className="text-slate-400" />
							<input className="w-full bg-transparent outline-none" placeholder="Search products" type="text" value={query} onChange={(event) => setQuery(event.target.value)} />
						</div>
					</div>
				</div>
			</div>

			<div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
				{fromFallback ? (
					<div className="mb-6 rounded-md border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
						Backend products were not available at <span className="font-bold">/api/products</span>, so sample products are showing for now.
					</div>
				) : null}

				<div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
					<div className="flex flex-wrap gap-2">
						{filters.map((filter) => (
							<button
								key={filter}
								className={`rounded-md px-4 py-2 text-sm font-bold ${activeFilter === filter ? "bg-blue-950 text-white" : "border border-slate-200 bg-white text-slate-700 hover:border-blue-300"}`}
								onClick={() => setActiveFilter(filter)}
							>
								{filter}
							</button>
						))}
					</div>
					<div className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-4 font-bold text-slate-700">
						<FaFilter /> {visibleProducts.length} products
					</div>
				</div>

				{isLoading ? (
					<div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
						{[1, 2, 3, 4, 5, 6].map((item) => (
							<div key={item} className="h-96 animate-pulse rounded-lg border border-slate-200 bg-white p-5">
								<div className="h-44 rounded-md bg-slate-200" />
								<div className="mt-5 h-4 w-24 rounded bg-slate-200" />
								<div className="mt-4 h-7 w-3/4 rounded bg-slate-200" />
								<div className="mt-3 h-4 w-full rounded bg-slate-200" />
							</div>
						))}
					</div>
				) : (
					<div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
						{visibleProducts.map((product) => (
							<article key={product.id} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
								<div className="flex h-44 items-center justify-center overflow-hidden rounded-md bg-blue-100 text-5xl text-blue-800">
									{product.imageUrl ? <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" /> : <FaWrench />}
								</div>
								<div className="mt-5 flex items-center justify-between gap-3">
									<span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold uppercase text-green-700">{product.badge || (product.stock ? `${product.stock} in stock` : "Available")}</span>
									{product.rating ? (
										<span className="flex items-center gap-1 text-sm font-bold text-slate-700">
											<FaStar className="text-green-500" /> {product.rating.toFixed(1)}
										</span>
									) : null}
								</div>
								<p className="mt-4 text-sm font-bold uppercase text-blue-800">{product.category}</p>
								<h2 className="mt-2 min-h-14 text-xl font-bold">{product.name}</h2>
								<p className="mt-2 min-h-12 text-sm leading-6 text-slate-600">{product.description}</p>
								<div className="mt-5 flex items-center justify-between gap-4">
									<p className="text-2xl font-bold text-blue-950">{formatPrice(product.price)}</p>
									<button className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-green-500 px-4 text-sm font-bold text-white hover:bg-green-400" onClick={() => addItem(product)}>
										Add <FaArrowRight />
									</button>
								</div>
							</article>
						))}
					</div>
				)}

				{!isLoading && visibleProducts.length === 0 ? (
					<div className="mt-8 rounded-lg border border-slate-200 bg-white p-8 text-center">
						<h2 className="text-xl font-bold">No products found</h2>
						<p className="mt-2 text-slate-600">Try another search or category filter.</p>
					</div>
				) : null}
			</div>
		</section>
	);
}
