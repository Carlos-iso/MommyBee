import { useState, useEffect } from "react";
import { USER_PROFILE } from "../data/mockData";
import { api } from "../services/api";

export default function Profile({ onBack, onLogout, onBecomeSeller }) {
	const [user, setUser] = useState(() => {
		const u = localStorage.getItem("user");
		if (u) return { ...USER_PROFILE, ...JSON.parse(u) };
		return USER_PROFILE;
	});
	const [sellerStatus, setSellerStatus] = useState(null);

	const upUser = (fields) => {
		setUser((prev) => {
			const updated = { ...prev, ...fields };
			localStorage.setItem("userProfile", JSON.stringify(updated));
			return updated;
		});
	};
	useEffect(() => {
		localStorage.setItem("userProfile", JSON.stringify(user));
	}, [user]);

	useEffect(() => {
		checkSellerStatus();
	}, []);

	const checkSellerStatus = async () => {
		try {
			const status = await api.getMySeller();
			setSellerStatus(status);
		} catch (err) {
			setSellerStatus(null);
		}
	};

	if (!user) return null;

	const menuItems = [
		{ id: "orders", icon: "📦", label: "My Orders" },
		{ id: "sales", icon: "💰", label: "My Sales" },
		{ id: "favorites", icon: "❤️", label: "Favorites" },
		{ id: "addresses", icon: "📍", label: "Addresses" },
		{ id: "payment", icon: "💳", label: "Payment Methods" },
		{ id: "settings", icon: "⚙️", label: "Settings" },
		{ id: "help", icon: "❓", label: "Help & Support" },
	];

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="bg-white border-b border-gray-100 px-4 py-4 sticky top-0 z-40 md:hidden">
				<div className="flex items-center gap-3">
					<button
						onClick={onBack}
						className="text-amber-500 hover:text-amber-600"
					>
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							strokeWidth={2}
							viewBox="0 0 24 24"
						>
							<path d="M15 19l-7-7 7-7" />
						</svg>
					</button>
					<h1 className="text-xl font-bold text-gray-800">Perfil</h1>
				</div>
			</div>

			<div className="md:max-w-4xl md:mx-auto">
				<div className="bg-gradient-to-br from-amber-400 to-yellow-300 px-6 py-8 md:rounded-b-3xl">
					<div className="flex items-center gap-4">
						<div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-4xl shadow-lg">
							{user.avatar}
						</div>
						<div className="text-white">
							<h2 className="text-2xl font-bold">{user.name}</h2>
							<p className="text-amber-100 text-sm">{user.email}</p>
							<p className="text-amber-100 text-xs mt-1">📍 {user.location}</p>
						</div>
					</div>
				</div>

				<div className="px-4 md:px-0 -mt-4">
					<div className="bg-white rounded-2xl shadow-sm p-4 flex justify-around">
						<div className="text-center">
							<p className="text-2xl font-bold text-gray-800">
								{user.stats.orders}
							</p>
							<p className="text-xs text-gray-500">Orders</p>
						</div>
						<div className="text-center">
							<p className="text-2xl font-bold text-gray-800">
								{user.stats.sales}
							</p>
							<p className="text-xs text-gray-500">Sales</p>
						</div>
						<div className="text-center">
							<p className="text-2xl font-bold text-gray-800">
								⭐ {user.stats.rating}
							</p>
							<p className="text-xs text-gray-500">Rating</p>
						</div>
					</div>
				</div>

				<div className="px-4 md:px-0 mt-4">
					<div className="bg-white rounded-2xl shadow-sm overflow-hidden">
						{menuItems.map((item, index) => (
							<button
								key={item.id}
								className={`w-full flex items-center gap-4 px-6 py-4 hover:bg-amber-50 transition-colors ${
									index !== menuItems.length - 1
										? "border-b border-gray-100"
										: ""
								}`}
							>
								<span className="text-xl">{item.icon}</span>
								<span className="flex-1 text-left font-medium text-gray-700">
									{item.label}
								</span>
								<svg
									className="w-5 h-5 text-gray-400"
									fill="none"
									stroke="currentColor"
									strokeWidth={2}
									viewBox="0 0 24 24"
								>
									<path d="M9 5l7 7-7 7" />
								</svg>
							</button>
						))}
					</div>
				</div>

				<div className="px-4 md:px-0 mt-4 mb-8">
					<div className="bg-white rounded-2xl shadow-sm p-4">
						<h3 className="font-bold text-gray-800 mb-3">My Coupons</h3>
						<div className="space-y-2">
							{user.coupons.map((coupon) => (
								<div
									key={coupon.code}
									className="bg-amber-50 rounded-xl p-3 flex items-center justify-between"
								>
									<div>
										<p className="font-bold text-amber-600">{coupon.code}</p>
										<p className="text-xs text-gray-500">
											{coupon.type === "shipping"
												? "Free Shipping"
												: `R$${coupon.discount} off`}{" "}
											• Min R${coupon.minValue}
										</p>
									</div>
									<span className="text-xs text-gray-400">
										Expires: {coupon.expires}
									</span>
								</div>
							))}
						</div>
					</div>
				</div>

				{!sellerStatus && (
					<div className="px-4 md:px-0 mt-4">
						<button
							onClick={() => onBecomeSeller && onBecomeSeller()}
							className="w-full bg-amber-400 text-white font-bold py-3 rounded-xl hover:bg-amber-500 transition-colors"
						>
							🐝 Tornar-se Vendedora
						</button>
					</div>
				)}

				{sellerStatus && sellerStatus.status === "approved" && (
					<div className="px-4 md:px-0 mt-4">
						<button
							onClick={() => onBecomeSeller && onBecomeSeller()}
							className="w-full bg-emerald-400 text-white font-bold py-3 rounded-xl hover:bg-emerald-500 transition-colors"
						>
							🏪 Minha Loja
						</button>
					</div>
				)}

				<div className="px-4 md:px-0 mt-4">
					<button
						onClick={onLogout}
						className="w-full bg-rose-50 text-rose-500 font-bold py-3 rounded-xl hover:bg-rose-100 transition-colors"
					>
						Sair da Conta
					</button>
				</div>
			</div>
		</div>
	);
}
