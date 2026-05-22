import { FaFacebook, FaInstagram, FaTint, FaTwitter } from "react-icons/fa";

const groups = [
	{ title: "Shop", links: ["Pipes", "Faucets", "Showers", "Pumps", "Tools"] },
	{ title: "Support", links: ["Contact", "Shipping", "Returns", "FAQ", "Track order"] },
	{ title: "Company", links: ["About", "Careers", "Press", "Wholesale", "Blog"] },
];

export default function Footer() {
	return (
		<footer className="bg-blue-950 px-6 py-10 text-white lg:px-10">
			<div className="mx-auto max-w-7xl">
				<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
					<div>
						<a href="/" className="flex items-center gap-3">
							<span className="flex h-11 w-11 items-center justify-center rounded-lg bg-green-800 text-2xl">
								<FaTint />
							</span>
							<span className="font-bold">PATZEN</span>
						</a>
						<p className="mt-4 max-w-sm leading-7 text-blue-100">Trusted by professionals for over 25 years. Quality plumbing supplies, fast shipping, and expert support.</p>
						<div className="mt-5 flex gap-4 text-xl text-blue-100">
							<a href="/" aria-label="Facebook" className="hover:text-green-400"><FaFacebook /></a>
							<a href="/" aria-label="Twitter" className="hover:text-green-400"><FaTwitter /></a>
							<a href="/" aria-label="Instagram" className="hover:text-green-400"><FaInstagram /></a>
						</div>
					</div>

					{groups.map((group) => (
						<div key={group.title}>
							<p className="font-bold uppercase">{group.title}</p>
							<div className="mt-4 grid gap-2">
								{group.links.map((link) => (
									<a key={link} href={group.title === "Support" ? "/support" : "/shop"} className="text-blue-200 hover:text-green-400">
										{link}
									</a>
								))}
							</div>
						</div>
					))}
				</div>

				<div className="mt-10 border-t border-blue-800 pt-6 text-sm text-blue-200">
					<p>© 2026 Patzen. All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
}
