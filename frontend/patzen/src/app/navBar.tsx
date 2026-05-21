import { FaShoppingCart, FaHeart, FaUser, FaTint, FaSearch } from 'react-icons/fa';

function NavBar() {
    return (
        <div className="flex flex-row bg-blue-950 p-2 justify-between">
            <div className="flex flex-row">
                <span className="text-3xl bg-green-900 p-1 rounded-xl mr-2">
                    <FaTint className="text-white " />
                </span>
                <span>  
                    <p className="text-white font-bold">PATZEN</p>
                    <p className="text-sm text-gray-300">Plumbing Solutions</p>
                </span>

            </div>
            <div className="flex flex-row space-x-4 text-white">
                <span className="cursor-pointer"
                onClick={() => window.location.href = '/'}
                >Home</span>
                <span className="cursor-pointer" onClick={() => window.location.href = '/shop'}>Shop</span>
                <span className="cursor-pointer" onClick={() => window.location.href = '/wishlist'}>Wishlist</span>
                <span className="cursor-pointer" onClick={() => window.location.href = '/support'}>Support</span>
            </div>
                <div className="flex flex-row items-center bg-white rounded-lg h-8 w-full max-w-xs px-2">
                    <FaSearch  className="text-gray-500" />
                    <input type="text" placeholder="Search..." />
                </div>
            <div className="flex flex-row space-x-4 text-white">
                <span className="cursor-pointer"
                onClick={() => window.location.href = '/wishlist'}
                >
                    <FaHeart />
                </span>
                <span className="cursor-pointer"
                onClick={() => window.location.href = '/account'}
                >
                    <FaUser />
                </span>
                <span className="cursor-pointer"
                onClick={() => window.location.href = '/cart'}
                >
                    <FaShoppingCart  />
                </span>
            </div>
        </div>
    );    
}
export default NavBar;