import { FaArrowRight, FaMinus, FaPlus, FaShieldAlt, FaTrash, FaTruck, FaWrench } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../lib/products";

export default function Cart() {
	const { items, subtotal, delivery, discount, total, removeItem, updateQuantity, clearCart } = useCart();

	return (
		<section className="bg-slate-50 px-6 py-12 text-slate-950 lg:px-10">
			<div className="mx-auto max-w-7xl">
				<p className="text-sm font-bold uppercase text-green-600">Cart</p>
				<h1 className="mt-2 font-['Inter'] text-4xl font-bold">Review your order</h1>
				<p className="mt-3 max-w-2xl text-slate-600">Your jobsite essentials stay saved in this browser while you finish checkout.</p>

				{items.length === 0 ? (
					<div className="mt-8 rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm">
						<h2 className="text-2xl font-bold">Your cart is empty</h2>
						<p className="mt-3 text-slate-600">Add products from the shop and they will appear here.</p>
						<a href="/shop" className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-green-500 px-6 font-bold text-white hover:bg-green-400">
							Shop products <FaArrowRight />
						</a>
					</div>
				) : (
					<div className="mt-8 grid gap-6 lg:grid-cols-[1fr_380px]">
						<div className="space-y-4">
							{items.map((item) => (
								<div key={item.product.id} className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:grid-cols-[96px_1fr_auto] sm:items-center">
									<div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-md bg-blue-100 text-3xl text-blue-800">
										{item.product.imageUrl ? <img src={item.product.imageUrl} alt={item.product.name} className="h-full w-full object-cover" /> : <FaWrench />}
									</div>
									<div>
										<h2 className="text-lg font-bold">{item.product.name}</h2>
										<p className="mt-1 text-sm text-slate-600">{item.product.description}</p>
										<button className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-red-600 hover:text-red-700" onClick={() => removeItem(item.product.id)}>
											<FaTrash /> Remove
										</button>
									</div>
									<div className="flex items-center justify-between gap-5 sm:flex-col sm:items-end">
										<p className="text-xl font-bold text-blue-950">{formatPrice(item.product.price * item.quantity)}</p>
										<div className="flex h-10 items-center overflow-hidden rounded-md border border-slate-200">
											<button className="flex h-full w-10 items-center justify-center text-slate-600 hover:bg-slate-100" onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>
												<FaMinus />
											</button>
											<span className="flex h-full w-10 items-center justify-center border-x border-slate-200 font-bold">{item.quantity}</span>
											<button className="flex h-full w-10 items-center justify-center text-slate-600 hover:bg-slate-100" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>
												<FaPlus />
											</button>
										</div>
									</div>
								</div>
							))}
						</div>

						<aside className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
							<h2 className="text-xl font-bold">Order summary</h2>
							<div className="mt-5 space-y-3 border-b border-slate-200 pb-5 text-sm">
								<div className="flex justify-between"><span className="text-slate-600">Subtotal</span><span className="font-bold">{formatPrice(subtotal)}</span></div>
								<div className="flex justify-between"><span className="text-slate-600">Delivery</span><span className="font-bold">{delivery === 0 ? "Free" : formatPrice(delivery)}</span></div>
								<div className="flex justify-between"><span className="text-slate-600">Trade discount</span><span className="font-bold text-green-600">-{formatPrice(discount)}</span></div>
							</div>
							<div className="mt-5 flex justify-between text-xl font-bold">
								<span>Total</span>
								<span>{formatPrice(total)}</span>
							</div>
							<a href="/profile" className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-green-500 font-bold text-white hover:bg-green-400">
								Checkout <FaArrowRight />
							</a>
							<button className="mt-3 h-11 w-full rounded-md border border-slate-200 font-bold text-slate-700 hover:border-red-300 hover:text-red-600" onClick={clearCart}>
								Clear cart
							</button>
							<div className="mt-6 grid gap-3 text-sm text-slate-600">
								<p className="flex items-center gap-3"><FaTruck className="text-blue-700" /> Fast dispatch on in-stock items</p>
								<p className="flex items-center gap-3"><FaShieldAlt className="text-blue-700" /> Secure checkout and warranty support</p>
							</div>
						</aside>
					</div>
				)}
			</div>
		</section>
	);
}
