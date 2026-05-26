import { useEffect, useState } from "react";
import {
	FaArrowRight,
	FaBolt,
	FaCheckCircle,
	FaFireAlt,
	FaHeadphones,
	FaShieldAlt,
	FaStar,
	FaTint,
	FaTools,
	FaTruck,
	FaWrench,
} from "react-icons/fa";
import home from "../assets/home.jpg";
import home2 from "../assets/home2.jpg";
import { fetchProducts, formatPrice } from "../lib/products";
import type { Product } from "../lib/products";

const trustBadges = [
	{ icon: FaTruck, title: "Fast dispatch", detail: "Same-day delivery" },
	{ icon: FaShieldAlt, title: "5-year warranty", detail: "On selected lines" },
	{ icon: FaWrench, title: "Pro-tested", detail: "By certified plumbers" },
	{ icon: FaHeadphones, title: "Expert support", detail: "Real humans, 7 days" },
];

const categories = [
	{ icon: FaTint, title: "Pipes & fittings", detail: "Copper, PVC, PEX, valves", items: "2,400+ items" },
	{ icon: FaFireAlt, title: "Heating", detail: "Radiators, boilers, controls", items: "860+ items" },
	{ icon: FaTools, title: "Tools & sealants", detail: "Cutters, tapes, compounds", items: "1,100+ items" },
	{ icon: FaBolt, title: "Pumps & drainage", detail: "Boosters, sumps, traps", items: "640+ items" },
];

export default function Home() {
	const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
	const [isLoadingProducts, setIsLoadingProducts] = useState(true);

	useEffect(() => {
		let isMounted = true;

		fetchProducts()
			.then((result) => {
				if (isMounted) {
					setFeaturedProducts(result.products.slice(0, 3));
				}
			})
			.finally(() => {
				if (isMounted) {
					setIsLoadingProducts(false);
				}
			});

		return () => {
			isMounted = false;
		};
	}, []);

	return (
		<section className="bg-slate-50 text-slate-950">
			<div className="bg-blue-900">
				<div className="mx-auto grid max-w-7xl  gap-10 px-6 py-12 lg:grid-cols-[1fr_0.95fr] lg:px-10 lg:py-16">
					<div className="max-w-2xl">
						<p className="mb-4 text-sm font-bold uppercase tracking-wide text-green-400">Trade-grade plumbing supply</p>
						<h1 className="font-['Inter'] text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
							Built to flow. <span className="block text-green-400">Engineered to last.</span>
						</h1>
						<p className="mt-5 max-w-xl text-lg leading-8 text-blue-100">
							From copper fittings to pressure pumps, Patzen keeps pros and DIYers stocked with dependable parts, sharp pricing, and fast delivery.
						</p>

						<div className="mt-8 flex flex-col gap-3 sm:flex-row">
							<a className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-green-500 px-6 font-bold text-white shadow-lg shadow-green-950/20 transition hover:bg-green-400" href="/shop">
								Shop now <FaArrowRight />
							</a>
							<a className="inline-flex h-12 items-center justify-center rounded-md border border-blue-200 px-6 font-bold text-white transition hover:bg-white hover:text-blue-950" href="#categories">
								Browse categories
							</a>
						</div>

						<div className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-blue-800 pt-8 text-white">
							<div>
								<p className="text-3xl font-bold text-green-400">10K+</p>
								<p className="mt-1 text-sm text-blue-200">SKUs in stock</p>
							</div>
							<div>
								<p className="text-3xl font-bold text-green-400">25y</p>
								<p className="mt-1 text-sm text-blue-200">Trusted experts</p>
							</div>
							<div>
								<p className="text-3xl font-bold text-green-400">
									4.9 <FaStar className="mb-1 inline text-xl" />
								</p>
								<p className="mt-1 text-sm text-blue-200">Customer rating</p>
							</div>
						</div>
					</div>

					<div className="relative min-h-[360px] overflow-hidden rounded-lg bg-blue-900 shadow-2xl shadow-blue-950/40 lg:min-h-[500px]">
						<img src={home} alt="Plumbing parts and pipe fittings" className="absolute inset-0 h-full w-full object-cover" />
						<div className="absolute inset-x-4 bottom-4 rounded-md bg-white/95 p-4 shadow-xl backdrop-blur sm:inset-x-6 sm:bottom-6">
							<div className="flex items-center justify-between gap-4">
								<div>
									<p className="text-sm font-bold uppercase text-green-600">Ready for dispatch</p>
									<p className="mt-1 text-lg font-bold text-slate-950">1,280 contractor essentials ship today</p>
								</div>
								<FaCheckCircle className="shrink-0 text-3xl text-green-500" />
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="border-b border-blue-200 bg-blue-50">
				<div className="mx-auto grid max-w-7xl gap-4 px-6 py-5 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
					{trustBadges.map(({ icon: Icon, title, detail }) => (
						<div key={title} className="flex items-center gap-4">
							<span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-blue-100 text-xl text-blue-700">
								<Icon />
							</span>
							<span>
								<p className="font-bold text-slate-950">{title}</p>
								<p className="text-sm text-slate-600">{detail}</p>
							</span>
						</div>
					))}
				</div>
			</div>

			<div id="categories" className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
				<div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
					<div>
						<p className="text-sm font-bold uppercase text-green-600">Shop by category</p>
						<h2 className="mt-2 font-['Inter'] text-3xl font-bold text-slate-950 sm:text-4xl">Find your fit</h2>
					</div>
					<a href="/shop" className="inline-flex items-center gap-2 font-bold text-blue-800 hover:text-blue-950">
						View all categories <FaArrowRight />
					</a>
				</div>

				<div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
					{categories.map(({ icon: Icon, title, detail, items }) => (
						<a key={title} href="/shop" className="group rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg">
							<span className="flex h-12 w-12 items-center justify-center rounded-md bg-green-50 text-2xl text-green-600">
								<Icon />
							</span>
							<p className="mt-5 text-lg font-bold text-slate-950">{title}</p>
							<p className="mt-2 text-sm text-slate-600">{detail}</p>
							<p className="mt-5 text-sm font-bold text-blue-800">{items}</p>
						</a>
					))}
				</div>
			</div>

			<div className="bg-white">
				<div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
					<div>
						<p className="text-sm font-bold uppercase text-green-600">Featured</p>
						<h2 className="mt-2 font-['Inter'] text-3xl font-bold text-slate-950 sm:text-4xl">Backend products</h2>
					</div>

					{isLoadingProducts ? (
						<p className="mt-8 text-slate-600">Loading products...</p>
					) : featuredProducts.length > 0 ? (
						<div className="mt-8 grid gap-5 md:grid-cols-3">
							{featuredProducts.map((product) => (
								<div key={product.id} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
									{product.imageUrl ? (
										<div className="h-40 overflow-hidden rounded-md bg-blue-100">
											<img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
										</div>
									) : null}
									<div className={product.imageUrl ? "mt-5 flex items-center justify-between gap-4" : "flex items-center justify-between gap-4"}>
										<span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold uppercase text-green-700">{product.badge || product.category}</span>
										{product.rating ? (
											<span className="flex items-center gap-1 text-sm font-bold text-slate-700">
												<FaStar className="text-green-500" /> {product.rating.toFixed(1)}
											</span>
										) : null}
									</div>
									<p className="mt-4 min-h-14 text-lg font-bold text-slate-950">{product.name}</p>
									<p className="mt-2 min-h-12 text-sm leading-6 text-slate-600">{product.description}</p>
									<div className="mt-5 flex items-center justify-between gap-4">
										<p className="text-2xl font-bold text-blue-950">{formatPrice(product.price)}</p>
										<a href="/shop" className="inline-flex h-10 items-center justify-center rounded-md bg-blue-950 px-4 text-sm font-bold text-white hover:bg-blue-800">
											View
										</a>
									</div>
								</div>
							))}
						</div>
					) : (
						<div className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-6">
							<p className="font-bold text-slate-950">No backend products are available yet.</p>
							<p className="mt-2 text-sm leading-6 text-slate-600">Products added in the Django admin will appear here automatically.</p>
						</div>
					)}
				</div>
			</div>

			<div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
				<div
					className="overflow-hidden rounded-lg bg-blue-950 bg-cover bg-center"
					style={{
						backgroundImage: `linear-gradient(90deg, rgba(23, 37, 84, 0.95), rgba(23, 37, 84, 0.68)), url(${home2})`,
					}}
				>
					<div className="max-w-2xl px-6 py-12 sm:px-10 lg:py-16">
						<p className="text-sm font-bold uppercase text-green-400">Pro account</p>
						<h2 className="mt-3 font-['Inter'] text-3xl font-bold text-white sm:text-4xl">Trade discounts up to 30% off</h2>
						<p className="mt-4 text-lg leading-8 text-blue-100">Verified plumbers and contractors get exclusive pricing, dedicated support, and Net-30 terms.</p>
						<a href="/support" className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-green-500 px-6 font-bold text-white hover:bg-green-400">
							Apply for trade pricing <FaArrowRight />
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}
