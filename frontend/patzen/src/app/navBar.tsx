import { FaHeart, FaSearch, FaShoppingCart, FaTint, FaUser } from "react-icons/fa";
import { useCart } from "../context/CartContext";

const links = [
	{ label: "Home", href: "/" },
	{ label: "Shop", href: "/shop" },
	{ label: "Wishlist", href: "/wishlist" },
	{ label: "Support", href: "/support" },
];

function NavBar() {
	const { itemCount } = useCart();

	return (
		<header className="bg-blue-950 px-4 py-3 text-white lg:px-10">
			<div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
				<a href="/" className="flex items-center gap-3">
					<span className="flex h-11 w-11 items-center justify-center rounded-lg bg-green-800 text-2xl">
						<FaTint />
					</span>
					<span>
						<p className="font-bold leading-tight">PATZEN</p>
						<p className="text-sm text-blue-200">Plumbing Solutions</p>
					</span>
				</a>

				<nav className="flex flex-wrap gap-4 text-sm font-bold text-blue-100 lg:gap-6">
					{links.map((link) => (
						<a key={link.href} href={link.href} className="hover:text-green-400">
							{link.label}
						</a>
					))}
				</nav>

				<div className="flex flex-col gap-4 sm:flex-row sm:items-center">
					<div className="flex h-10 min-w-0 items-center gap-2 rounded-md bg-white px-3 text-slate-800 sm:w-72">
						<FaSearch className="shrink-0 text-slate-400" />
						<input className="min-w-0 flex-1 bg-transparent text-sm outline-none" type="text" placeholder="Search supplies" />
					</div>
					<div className="flex gap-3 text-lg">
						<a className="hover:text-green-400" href="/wishlist" aria-label="Wishlist">
							<FaHeart />
						</a>
						<a className="hover:text-green-400" href="/profile" aria-label="Profile">
							<FaUser />
						</a>
						<a className="relative hover:text-green-400" href="/cart" aria-label="Cart">
							<FaShoppingCart />
							{itemCount > 0 ? (
								<span className="absolute -right-3 -top-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-green-500 px-1 text-xs font-bold text-white">
									{itemCount}
								</span>
							) : null}
						</a>
					</div>
				</div>
			</div>
		</header>
	);
}

export default NavBar;
