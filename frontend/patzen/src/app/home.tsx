import { FaArrowRight, FaStar, FaTruck, FaShieldAlt, FaWrench, FaHeadphones } from "react-icons/fa"
import home from "../assets/home.jpg";
import home2 from "../assets/home2.jpg";

export default function Home() {
	return (
		<section className="">
			<div className="flex flex-row gap-12 p-12 bg-blue-900">


				<div className="flex flex-col gap-4  ">
					<span className="text-5xl font-bold mt-16 font-['Inter']">
						<p className="text-white">Built to flow.</p>
					<p className="text-green-500">Engineered to last.</p>
					</span>
					<span>
						<p className="text-gray-400 text-lg">
							From copper fittings to pumps <br /> everything pros and DYIers need, delivered fast.
						</p>
					</span>
					<span className="flex flex-row gap-4">
						<span  className="bg-green-500 text-white font-bold h-10 w-40  py-2 px-4 rounded-lg justify-center flex flex-row gap-2">Shop now <FaArrowRight className="mt-1" /></span>
						<span className="text-white bg-transparent border border-white py-2 px-4 rounded-lg">Browse categories</span>
					</span>
					<span className="flex flex-row gap-12 mt-8">	
						<span>
						<p className="text-green-500 text-2xl font-bold">10K+</p>
						<p className="text-gray-400">Skus In Stock</p>
						</span>
					<span>
						<p className="text-green-500 text-2xl font-bold">25y</p>
						<p className="text-gray-400">Trusted Experts</p>
					</span>
					<span>
					      <p className="text-green-500 text-2xl font-bold">4.9 <FaStar className="inline text-green-500 mb-2" /></p>
					      <p className="text-gray-400">Customer Rating</p>
					</span>
					</span>
				</div>
				<div className=" mt-16 flex flex-row gap-4 items-center ml-auto ">
					<img src={home}  className="w-[600px] h-[450px] object-cover rounded-lg mt-4" />
				</div>
			</div>
			<div className="flex flex-row gap-16   bg-blue-100 text-center justify-flex-start border-b border-blue-300 py-2">
				<span className="flex flex-row gap-4 items-center">
					<span className="text-blue-500 text-2xl bg-blue-200 p-2 rounded-lg"><FaTruck /></span>
					<span>	
					<p>Fast dispatch</p>
					<p>Same-day delivery</p>
					</span>
				</span>
				<span className="flex flex-row gap-4 items-center">
					<span className="text-blue-500 text-2xl bg-blue-200 p-2 rounded-lg"><FaShieldAlt /></span>
					<span>
						<p>5-Year warranty</p>
					<p>On selected lines </p>
					</span>
				</span>
				<span className="flex flex-row gap-4 items-center">
					<span className="text-blue-500 text-2xl bg-blue-200 p-2 rounded-lg"><FaWrench /></span>
					<span>
						<p>Pro-tested</p>
						<p>By certified Plumbers</p>
					</span>
				</span>
				<span className="flex flex-row gap-4 items-center">
					<span className="text-blue-500 text-2xl bg-blue-200 p-2 rounded-lg"><FaHeadphones /></span>
					<span>	
						<p>Expert support</p>
					<p>Real humans, 7 days</p></span>
				</span>
			</div>

			<div>	
				<span>
					<p className="text-green-500 font-bold">SHOP BY CATEGORY</p>
					<p className="text-black text-4xl font-bold font-['Inter']">Find your fit</p>
				</span>
			</div>
			<div>
				<span>
					<p className="text-green-500 font-bold">FEATURED</p>
					<p className="text-black text-4xl font-bold font-['Inter']">Best sellers</p>
				</span>
			</div>

			<div className="flex flex-row gap-12  bg-blue-950 p-12 rounded-lg m-12 "
			style={{backgroundImage: `url(${home2})`, backgroundSize: 'cover', backgroundPosition: 'center'}}
			>
				<div className="flex flex-col gap-4 bg-blue-900 bg-opacity-40 p-6 rounded-lg w-full">
					<span >
					<p className="text-green-500 font-bold">PRO ACCOUNT</p>
					<p className="text-white text-2xl font-bold font-['Inter']">Trade discounts up to 30% off</p>
					<p className="text-gray-400">Verified plumbers and contractors get exclusive pricing, <br /> dedicated support, and Net-30 terms.</p>
				</span>
				<span className="text-white bg-green-500 border border-white py-2 px-4 rounded-xl w-60 h-10 flex flex-row gap-2 items-center justify-center">Apply for Trade pricing <FaArrowRight /></span>
			
				</div>
				</div>
		</section>
	)
}
