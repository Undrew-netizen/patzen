import { useState } from "react";
import {
	FaArrowRight,
	FaBoxOpen,
	FaCheckCircle,
	FaEnvelope,
	FaHeadphones,
	FaQuestionCircle,
	FaShippingFast,
	FaTools,
	FaUndoAlt,
} from "react-icons/fa";

const supportOptions = [
	{
		icon: FaHeadphones,
		title: "Talk to support",
		detail: "Get help choosing parts, checking compatibility, or solving an order issue.",
		action: "Start a request",
	},
	{
		icon: FaShippingFast,
		title: "Track delivery",
		detail: "Check dispatch status, courier updates, and delivery windows for active orders.",
		action: "Track order",
	},
	{
		icon: FaUndoAlt,
		title: "Returns",
		detail: "Start a return for unused items or report damaged goods from a shipment.",
		action: "Start return",
	},
	{
		icon: FaTools,
		title: "Part matching",
		detail: "Send a photo, size, or code and we will help find a compatible replacement.",
		action: "Find a part",
	},
];

const faqs = [
	{
		question: "How fast do orders dispatch?",
		answer: "In-stock products usually dispatch the same business day when ordered before 2 PM.",
	},
	{
		question: "Can I get trade pricing?",
		answer: "Verified plumbers and contractors can apply for trade pricing, dedicated support, and account terms.",
	},
	{
		question: "What do I need for a return?",
		answer: "Keep the product unused, in its original packaging, and include your order number when contacting support.",
	},
];

export default function Support() {
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState("");
	const apiBaseUrl = import.meta.env.VITE_API_URL ?? "";

	return (
		<section className="bg-slate-50 text-slate-950">
			<div className="bg-blue-950 px-6 py-14 text-white lg:px-10">
				<div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_360px] lg:items-center">
					<div>
						<p className="text-sm font-bold uppercase text-green-400">Support</p>
						<h1 className="mt-3 max-w-3xl font-['Inter'] text-4xl font-bold leading-tight sm:text-5xl">
							We are here to help, plumber to plumber.
						</h1>
						<p className="mt-5 max-w-2xl text-lg leading-8 text-blue-100">
							Real humans, 7 days a week. Average response time is under 2 hours.
						</p>
					</div>

					<div className="rounded-lg border border-blue-800 bg-white/10 p-5 backdrop-blur">
						<p className="flex items-center gap-3 text-lg font-bold">
							<FaCheckCircle className="text-green-400" /> Support desk open
						</p>
						<div className="mt-5 grid gap-3 text-sm text-blue-100">
							<p className="flex items-center gap-3"><FaEnvelope className="text-green-400" /> support@patzen.com</p>
							<p className="flex items-center gap-3"><FaHeadphones className="text-green-400" /> Mon-Sun, 7:00 AM-8:00 PM</p>
							<p className="flex items-center gap-3"><FaBoxOpen className="text-green-400" /> Have your order number ready</p>
						</div>
					</div>
				</div>
			</div>

			<div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
				<div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
					{supportOptions.map(({ icon: Icon, title, detail, action }) => (
						<article key={title} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
							<span className="flex h-12 w-12 items-center justify-center rounded-md bg-green-50 text-2xl text-green-600">
								<Icon />
							</span>
							<h2 className="mt-5 text-xl font-bold">{title}</h2>
							<p className="mt-3 min-h-20 text-sm leading-6 text-slate-600">{detail}</p>
							<a href="#contact" className="mt-5 inline-flex items-center gap-2 font-bold text-blue-800 hover:text-blue-950">
								{action} <FaArrowRight />
							</a>
						</article>
					))}
				</div>

				<div className="mt-10 grid gap-6 lg:grid-cols-[1fr_420px]">
					<div id="contact" className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
						<p className="text-sm font-bold uppercase text-green-600">Contact us</p>
						<h2 className="mt-2 text-2xl font-bold">Send a support request</h2>
						<p className="mt-2 text-slate-600">Tell us what is happening and the team will come back with clear next steps.</p>

						{isSubmitted ? (
							<div className="mt-6 rounded-md border border-green-200 bg-green-50 p-4 text-green-800">
								<p className="flex items-center gap-3 font-bold"><FaCheckCircle /> Request received</p>
								<p className="mt-2 text-sm">Thanks. The support team will reply as soon as possible.</p>
							</div>
						) : null}

						{submitError ? (
							<div className="mt-6 rounded-md border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-700">
								{submitError}
							</div>
						) : null}

						<form
							className="mt-6 grid gap-4 sm:grid-cols-2"
							onSubmit={async (event) => {
								event.preventDefault();
								setIsSubmitting(true);
								setSubmitError("");
								setIsSubmitted(false);

								const formData = new FormData(event.currentTarget);
								const payload = {
									name: String(formData.get("name") ?? ""),
									email: String(formData.get("email") ?? ""),
									orderNumber: String(formData.get("order") ?? ""),
									topic: String(formData.get("topic") ?? ""),
									message: String(formData.get("message") ?? ""),
								};

								try {
									const response = await fetch(`${apiBaseUrl}/api/support/`, {
										method: "POST",
										headers: { "Content-Type": "application/json" },
										body: JSON.stringify(payload),
									});

									if (!response.ok) {
										throw new Error("Support request failed.");
									}

									event.currentTarget.reset();
									setIsSubmitted(true);
								} catch {
									setSubmitError("Could not send your request. Please check that the backend is running and try again.");
								} finally {
									setIsSubmitting(false);
								}
							}}
						>
							<input className="h-12 rounded-md border border-slate-200 px-4 outline-none focus:border-blue-500" name="name" placeholder="Name" required />
							<input className="h-12 rounded-md border border-slate-200 px-4 outline-none focus:border-blue-500" name="email" placeholder="Email" required type="email" />
							<input className="h-12 rounded-md border border-slate-200 px-4 outline-none focus:border-blue-500" name="order" placeholder="Order number" />
							<select className="h-12 rounded-md border border-slate-200 px-4 outline-none focus:border-blue-500" name="topic" defaultValue="Part matching">
								<option>Part matching</option>
								<option>Delivery issue</option>
								<option>Return request</option>
								<option>Trade account</option>
							</select>
							<textarea className="min-h-36 rounded-md border border-slate-200 p-4 outline-none focus:border-blue-500 sm:col-span-2" name="message" placeholder="How can we help?" required />
							<button className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-green-500 px-6 font-bold text-white hover:bg-green-400 disabled:cursor-not-allowed disabled:bg-slate-400 sm:w-fit" disabled={isSubmitting}>
								{isSubmitting ? "Sending..." : "Send message"} <FaArrowRight />
							</button>
						</form>
					</div>

					<aside className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
						<p className="text-sm font-bold uppercase text-green-600">Quick answers</p>
						<h2 className="mt-2 text-2xl font-bold">Common questions</h2>
						<div className="mt-5 divide-y divide-slate-200">
							{faqs.map((faq) => (
								<div key={faq.question} className="py-5">
									<p className="flex items-start gap-3 font-bold">
										<FaQuestionCircle className="mt-1 shrink-0 text-blue-800" /> {faq.question}
									</p>
									<p className="mt-2 pl-8 text-sm leading-6 text-slate-600">{faq.answer}</p>
								</div>
							))}
						</div>
						<a href="/shop" className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-blue-950 font-bold text-white hover:bg-blue-800">
							Back to shop <FaArrowRight />
						</a>
					</aside>
				</div>
			</div>
		</section>
	);
}
