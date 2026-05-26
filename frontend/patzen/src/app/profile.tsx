import { FaBoxOpen, FaCheckCircle, FaCreditCard, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const orders = [
	{ id: "PZ-1048", status: "Out for delivery", total: "KSh 92.30" },
	{ id: "PZ-1039", status: "Delivered", total: "KSh 214.10" },
	{ id: "PZ-1026", status: "Delivered", total: "KSh 48.80" },
];

export default function Profile() {
	const navigate = useNavigate();
	const { user, isLoading, logout } = useAuth();

	if (isLoading) {
		return (
			<section className="bg-slate-50 px-6 py-12 text-slate-950 lg:px-10">
				<div className="mx-auto max-w-7xl">
					<div className="h-56 animate-pulse rounded-lg border border-slate-200 bg-white" />
				</div>
			</section>
		);
	}

	if (!user) {
		return (
			<section className="bg-slate-50 px-6 py-12 text-slate-950 lg:px-10">
				<div className="mx-auto max-w-3xl rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm">
					<p className="text-sm font-bold uppercase text-green-600">Account</p>
					<h1 className="mt-2 text-3xl font-bold">Sign in to view your profile</h1>
					<p className="mt-3 text-slate-600">Your order history and delivery details are saved after you log in.</p>
					<div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
						<a href="/login" className="inline-flex h-12 items-center justify-center rounded-md bg-green-500 px-6 font-bold text-white hover:bg-green-400">
							Sign in
						</a>
						<a href="/signup" className="inline-flex h-12 items-center justify-center rounded-md border border-slate-200 px-6 font-bold text-blue-900 hover:border-blue-300">
							Create account
						</a>
					</div>
				</div>
			</section>
		);
	}

	return (
		<section className="bg-slate-50 px-6 py-12 text-slate-950 lg:px-10">
			<div className="mx-auto max-w-7xl">
				<p className="text-sm font-bold uppercase text-green-600">Account</p>
				<h1 className="mt-2 font-['Inter'] text-4xl font-bold">Your Patzen profile</h1>
				<p className="mt-3 max-w-2xl text-slate-600">Manage orders, delivery details, and trade account preferences from one place.</p>

				<div className="mt-8 grid gap-6 lg:grid-cols-[360px_1fr]">
					<aside className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
						<div className="flex items-center gap-4">
							<span className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-2xl text-blue-800">
								<FaUser />
							</span>
							<div>
								<h2 className="text-xl font-bold">{user.name}</h2>
								<p className="text-sm text-slate-600">Trade account pending</p>
							</div>
						</div>
						<div className="mt-6 space-y-3 text-sm">
							<p className="flex items-center gap-3 rounded-md bg-green-50 p-3 font-bold text-green-700"><FaCheckCircle /> Email verified</p>
							<p className="flex items-center gap-3 rounded-md bg-slate-50 p-3 text-slate-700"><FaMapMarkerAlt /> Nairobi delivery address</p>
							<p className="flex items-center gap-3 rounded-md bg-slate-50 p-3 text-slate-700"><FaCreditCard /> Visa ending 2048</p>
						</div>
						<button
							className="mt-6 h-11 w-full rounded-md border border-slate-200 font-bold text-slate-700 hover:border-blue-300"
							onClick={async () => {
								await logout();
								navigate("/login");
							}}
						>
							Sign out
						</button>
					</aside>

					<div className="grid gap-6">
						<div className="grid gap-4 sm:grid-cols-3">
							<div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
								<p className="text-3xl font-bold text-blue-950">12</p>
								<p className="mt-1 text-sm text-slate-600">Orders this year</p>
							</div>
							<div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
								<p className="text-3xl font-bold text-blue-950">KSh 420</p>
								<p className="mt-1 text-sm text-slate-600">Trade savings</p>
							</div>
							<div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
								<p className="text-3xl font-bold text-blue-950">4</p>
								<p className="mt-1 text-sm text-slate-600">Saved lists</p>
							</div>
						</div>

						<div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
							<h2 className="text-xl font-bold">Recent orders</h2>
							<div className="mt-5 divide-y divide-slate-200">
								{orders.map((order) => (
									<div key={order.id} className="flex flex-col justify-between gap-3 py-4 sm:flex-row sm:items-center">
										<div className="flex items-center gap-4">
											<span className="flex h-11 w-11 items-center justify-center rounded-md bg-blue-100 text-blue-800"><FaBoxOpen /></span>
											<div>
												<p className="font-bold">{order.id}</p>
												<p className="text-sm text-slate-600">{order.status}</p>
											</div>
										</div>
										<p className="font-bold text-blue-950">{order.total}</p>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
