import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { Product } from "../lib/products";

export type CartItem = {
	product: Product;
	quantity: number;
};

type CartContextValue = {
	items: CartItem[];
	itemCount: number;
	subtotal: number;
	delivery: number;
	discount: number;
	total: number;
	addItem: (product: Product) => void;
	removeItem: (productId: string) => void;
	updateQuantity: (productId: string, quantity: number) => void;
	clearCart: () => void;
};

const CART_STORAGE_KEY = "patzen-cart";
const CartContext = createContext<CartContextValue | null>(null);

function loadCart() {
	try {
		const stored = window.localStorage.getItem(CART_STORAGE_KEY);
		if (!stored) {
			return [];
		}

		const parsed: unknown = JSON.parse(stored);
		if (!Array.isArray(parsed)) {
			return [];
		}

		return parsed.filter((item): item is CartItem => {
			if (typeof item !== "object" || item === null) {
				return false;
			}

			const candidate = item as CartItem;
			return Boolean(candidate.product?.id && candidate.product?.name && Number.isFinite(candidate.quantity));
		});
	} catch {
		return [];
	}
}

export function CartProvider({ children }: { children: ReactNode }) {
	const [items, setItems] = useState<CartItem[]>(loadCart);

	useEffect(() => {
		window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
	}, [items]);

	const value = useMemo<CartContextValue>(() => {
		const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
		const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
		const delivery = itemCount > 0 && subtotal < 100 ? 8 : 0;
		const discount = subtotal >= 75 ? subtotal * 0.1 : 0;
		const total = Math.max(subtotal + delivery - discount, 0);

		return {
			items,
			itemCount,
			subtotal,
			delivery,
			discount,
			total,
			addItem: (product) => {
				setItems((current) => {
					const existing = current.find((item) => item.product.id === product.id);
					if (existing) {
						return current.map((item) => (item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
					}

					return [...current, { product, quantity: 1 }];
				});
			},
			removeItem: (productId) => {
				setItems((current) => current.filter((item) => item.product.id !== productId));
			},
			updateQuantity: (productId, quantity) => {
				setItems((current) => {
					if (quantity <= 0) {
						return current.filter((item) => item.product.id !== productId);
					}

					return current.map((item) => (item.product.id === productId ? { ...item, quantity } : item));
				});
			},
			clearCart: () => {
				setItems([]);
			},
		};
	}, [items]);

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error("useCart must be used inside CartProvider");
	}

	return context;
}
