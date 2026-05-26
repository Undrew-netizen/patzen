import type { ReactNode } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import NavBar from './app/navBar'
import Footer from './app/footer'
import Home from './app/home'
import Shop from './app/shop'
import Cart from './app/cart'
import Wishlist from './app/wishlist'
import Profile from './app/profile'
import Support from './app/support'
import Login from './app/login'
import Signup from './app/signup'
import { useAuth } from './context/AuthContext'

function ProtectedRoute({ children }: { children: ReactNode }) {
	const { user, isLoading } = useAuth()
	const location = useLocation()

	if (isLoading) {
		return (
			<section className="bg-slate-50 px-6 py-12 text-slate-950 lg:px-10">
				<div className="mx-auto max-w-7xl">
					<div className="h-56 animate-pulse rounded-lg border border-slate-200 bg-white" />
				</div>
			</section>
		)
	}

	if (!user) {
		return <Navigate to="/login" state={{ from: location }} replace />
	}

	return children
}

export default function App() {
	return (
		<div className="min-h-screen flex flex-col">
			<NavBar />
			<main className="flex-1">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/shop" element={<ProtectedRoute><Shop /></ProtectedRoute>} />
					<Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
					<Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
					<Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
					<Route path="/support" element={<ProtectedRoute><Support /></ProtectedRoute>} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
				</Routes>
			</main>
			<Footer />
		</div>
	)
}
