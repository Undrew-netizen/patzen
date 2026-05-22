import { FaArrowRight, FaHeart, FaStar, FaWrench } from "react-icons/fa";

const savedItems = [
	{ name: "High-flow Shower Pump", price: "$149.00", note: "Price dropped 8%", rating: "4.8" },
	{ name: "Quarter-turn Ball Valve", price: "$12.80", note: "Back in stock", rating: "4.8" },
	{ name: "Pipe Cutter Pro 42mm", price: "$42.00", note: "Saved for tool kit", rating: "4.6" },
];

export default function Wishlist() {
	return (
		<section className="bg-slate-50 px-6 py-12 text-slate-950 lg:px-10">
			<div className="mx-auto max-w-7xl">
				<div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
					<div>
						<p className="text-sm font-bold uppercase text-green-600">Wishlist</p>
						<h1 className="mt-2 font-['Inter'] text-4xl font-bold">Saved for later</h1>
						<p className="mt-3 max-w-2xl text-slate-600">Keep track of parts you buy often, compare options, and move them into your cart when the job is ready.</p>
					</div>
					<a href="/shop" className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-blue-950 px-5 font-bold text-white hover:bg-blue-800">
						Keep shopping <FaArrowRight />
					</a>
				</div>

				<div className="mt-8 grid gap-5 md:grid-cols-3">
					{savedItems.map((item) => (
						<article key={item.name} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
							<div className="relative flex h-44 items-center justify-center rounded-md bg-blue-100 text-5xl text-blue-800">
								<FaWrench />
								<span className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-red-500 shadow">
									<FaHeart />
								</span>
							</div>
							<p className="mt-5 text-sm font-bold uppercase text-green-600">{item.note}</p>
							<h2 className="mt-2 min-h-14 text-xl font-bold">{item.name}</h2>
							<div className="mt-5 flex items-center justify-between">
								<p className="text-2xl font-bold text-blue-950">{item.price}</p>
								<span className="flex items-center gap-1 text-sm font-bold text-slate-700"><FaStar className="text-green-500" /> {item.rating}</span>
							</div>
							<a href="/cart" className="mt-5 inline-flex h-10 w-full items-center justify-center rounded-md bg-green-500 font-bold text-white hover:bg-green-400">
								Move to cart
							</a>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
