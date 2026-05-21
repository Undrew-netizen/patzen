import { Routes, Route } from 'react-router-dom'
import NavBar from './app/navBar'
import Footer from './app/footer'
import Home from './app/home'
import Shop from './app/shop'
import Cart from './app/cart'
import Wishlist from './app/wishlist'
import Profile from './app/profile'
import Support from './app/support'

export default function App() {
	return (
		<div className="min-h-screen flex flex-col">
			<NavBar />
			<main className="flex-1">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/shop" element={<Shop />} />
					<Route path="/cart" element={<Cart />} />
					<Route path="/wishlist" element={<Wishlist />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/support" element={<Support />} />
				</Routes>
			</main>
			<Footer />
		</div>
	)
}
