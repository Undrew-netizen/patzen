import { FaTint, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
	return (
		<footer className="bg-blue-950 p-6  justify-between">
           <div className="flex flex-row gap-12">
             <div>
                <div className="flex flex-row items-center">
                <span className="text-3xl bg-green-900 p-1 rounded-xl mr-2">
                    <FaTint className="text-white " />
                </span>
                <span className="text-white font-bold">PATZEN</span>
            </div>
            <span className="text-white ">Trusted by professionals for over 25 years. <br /> Quality plumbing supplies, fast shipping, <br /> expert support. </span>
            <span> 
                <span className="flex flex-row items-center mt-4">
                    <FaFacebook className="text-white mr-4 " />
                    <FaTwitter className="text-white mr-4" />
                    <FaInstagram className="text-white mr-4" />
                </span>
            </span>
            </div>
            <div className="flex flex-col gap-2">
                <p className="font-bold text-white">SHOP</p>
                <p className="text-gray-400">Pipes</p>
                <p className="text-gray-400">Faucets</p>
                <p className="text-gray-400">Showers</p>
                <p className="text-gray-400">Pumps</p>
                <p className="text-gray-400">Tools</p>
            </div>
        <div>
            <p className="font-bold text-white">SUPPORT</p>
            <p className="text-gray-400">Contact</p>
            <p className="text-gray-400">Shipping</p>
            <p className="text-gray-400">Returns</p>
            <p className="text-gray-400">FAQ</p>
            <p className="text-gray-400">Track Order</p>
        </div>
            <div>
                <p className="font-bold text-white">COMPANY</p>
            <p className="text-gray-400">About</p>
            <p className="text-gray-400">Careers</p>
            <p className="text-gray-400">Press</p>
            <p className="text-gray-400">Wholesale</p>
            <p className="text-gray-400">Blog</p></div>
            <div>

            </div>
			
           </div>
           <hr />
            <div>
                <p>
                    <span className="text-gray-400">© 2026 Patzen. All rights reserved. </span>
                </p>
            </div>
		</footer>
	);
}
