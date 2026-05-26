import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowRight, FaEnvelope, FaEye, FaEyeSlash, FaGoogle, FaLock, FaSignInAlt } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { continueWithGoogle } from "../lib/auth";

export default function Login() {
	const navigate = useNavigate();
	const location = useLocation();
	const { login } = useAuth();
	const [error, setError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const redirectTo = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname ?? "/profile";

	return (
		<section className="bg-slate-50 px-6 py-12 text-slate-950 lg:px-10">
			<div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
				<div className="flex min-h-[520px] flex-col justify-between rounded-lg bg-blue-950 p-8 text-white">
					<div>
						<span className="flex h-12 w-12 items-center justify-center rounded-md bg-green-500 text-xl">
							<FaSignInAlt />
						</span>
						<p className="mt-8 text-sm font-bold uppercase text-green-400">Welcome back</p>
						<h1 className="mt-3 font-['Inter'] text-4xl font-bold leading-tight sm:text-5xl">Sign in to your Patzen account</h1>
						<p className="mt-5 max-w-md text-lg leading-8 text-blue-100">Track orders, keep your cart synced, and manage trade account details from one place.</p>
					</div>
					<a href="/signup" className="mt-8 inline-flex w-fit items-center gap-2 font-bold text-green-300 hover:text-green-200">
						Create an account <FaArrowRight />
					</a>
				</div>

				<div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
					<p className="text-sm font-bold uppercase text-green-600">Login</p>
					<h2 className="mt-2 text-3xl font-bold">Access your account</h2>

					{error ? <div className="mt-6 rounded-md border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-700">{error}</div> : null}

					<button
						type="button"
						className="mt-8 inline-flex h-12 w-full items-center justify-center gap-3 rounded-md border border-slate-200 bg-white px-6 font-bold text-slate-800 hover:border-blue-300"
						onClick={() => continueWithGoogle(redirectTo)}
					>
						<FaGoogle className="text-blue-950" /> Continue with Google
					</button>

					<div className="mt-6 flex items-center gap-4 text-xs font-bold uppercase text-slate-400">
						<span className="h-px flex-1 bg-slate-200" />
						<span>Email login</span>
						<span className="h-px flex-1 bg-slate-200" />
					</div>

					<form
						className="mt-6 grid gap-5"
						onSubmit={async (event) => {
							event.preventDefault();
							setError("");
							setIsSubmitting(true);

							const formData = new FormData(event.currentTarget);
							try {
								await login({
									email: String(formData.get("email") ?? ""),
									password: String(formData.get("password") ?? ""),
								});
								navigate(redirectTo);
							} catch (caughtError) {
								setError(caughtError instanceof Error ? caughtError.message : "Could not sign in.");
							} finally {
								setIsSubmitting(false);
							}
						}}
					>
						<label className="grid gap-2 font-bold text-slate-800">
							Email
							<span className="flex h-12 items-center gap-3 rounded-md border border-slate-200 px-4 focus-within:border-blue-500">
								<FaEnvelope className="text-blue-950" />
								<input className="min-w-0 flex-1 outline-none" name="email" type="email" autoComplete="email" required />
							</span>
						</label>
						<label className="grid gap-2 font-bold text-slate-800">
							Password
							<span className="flex h-12 items-center gap-3 rounded-md border border-slate-200 px-4 focus-within:border-blue-500">
								<FaLock className="text-blue-950" />
								<input className="min-w-0 flex-1 outline-none" name="password" type={isPasswordVisible ? "text" : "password"} autoComplete="current-password" required />
								<button
									type="button"
									className="text-slate-500 hover:text-blue-950"
									aria-label={isPasswordVisible ? "Hide password" : "Show password"}
									onClick={() => setIsPasswordVisible((current) => !current)}
								>
									{isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
								</button>
							</span>
						</label>
						<button className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-green-500 px-6 font-bold text-white hover:bg-green-400 disabled:cursor-not-allowed disabled:bg-slate-400" disabled={isSubmitting}>
							{isSubmitting ? "Signing in..." : "Sign in"} <FaArrowRight />
						</button>
					</form>
				</div>
			</div>
		</section>
	);
}
