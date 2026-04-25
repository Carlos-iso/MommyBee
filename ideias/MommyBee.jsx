import { useState, useEffect, useRef } from "react";

// ─── Mock Data ───────────────────────────────────────────────────────────────

const BANNERS = [
  { id: 1, bg: "from-amber-400 to-yellow-300", title: "Welcome Gift!", sub: "Up to 50% off your first order", badge: "New User", emoji: "🎁" },
  { id: 2, bg: "from-orange-300 to-amber-400", title: "Flash Sale!", sub: "Baby essentials from R$9,99", badge: "Today Only", emoji: "⚡" },
  { id: 3, bg: "from-yellow-300 to-lime-300", title: "Free Shipping", sub: "On all orders above R$49", badge: "Limited", emoji: "🚚" },
];

const QUICK_ACTIONS = [
  { id: 1, icon: "🚚", label: "Free Ship" },
  { id: 2, icon: "⚡", label: "Daily Deals" },
  { id: 3, icon: "📦", label: "Sell Item", highlight: true },
  { id: 4, icon: "🗂️", label: "Categories" },
  { id: 5, icon: "🎟️", label: "Coupons" },
  { id: 6, icon: "⭐", label: "Top Rated" },
];

const CATEGORIES = [
  { id: 1, icon: "👶", label: "Clothes", color: "bg-pink-100" },
  { id: 2, icon: "🧸", label: "Toys", color: "bg-yellow-100" },
  { id: 3, icon: "🛒", label: "Strollers", color: "bg-blue-100" },
  { id: 4, icon: "🤱", label: "Maternity", color: "bg-purple-100" },
  { id: 5, icon: "♻️", label: "Used Items", color: "bg-green-100" },
  { id: 6, icon: "🍼", label: "Feeding", color: "bg-orange-100" },
  { id: 7, icon: "💊", label: "Health", color: "bg-red-100" },
  { id: 8, icon: "🎒", label: "School", color: "bg-indigo-100" },
];

const NEW_USER_DEALS = [
  { id: 1, img: "👶", title: "Baby Onesie Set", price: 29.9, oldPrice: 59.9, discount: 50, tag: "New" },
  { id: 2, img: "🧸", title: "Plush Bear Toy", price: 14.9, oldPrice: 34.9, discount: 57, tag: "Promo" },
  { id: 3, img: "🍼", title: "Anti-Colic Bottle", price: 19.9, oldPrice: 39.9, discount: 50, tag: "New" },
  { id: 4, img: "🛁", title: "Baby Bath Tub", price: 44.9, oldPrice: 89.9, discount: 50, tag: "Promo" },
  { id: 5, img: "🎵", title: "Musical Mobile", price: 59.9, oldPrice: 99.9, discount: 40, tag: "New" },
];

const POPULAR_NEAR = [
  { id: 1, img: "👗", title: "Girl Dress 2-3y", price: 25.9, location: "Mossoró, RN", sold: 128, tag: "Used" },
  { id: 2, img: "🚗", title: "Push Car Toy", price: 89.9, location: "Natal, RN", sold: 56, tag: "New" },
  { id: 3, img: "🎒", title: "Dino Backpack", price: 34.9, location: "Fortaleza, CE", sold: 201, tag: "New" },
  { id: 4, img: "🛏️", title: "Crib Bumper Set", price: 65.0, location: "Recife, PE", sold: 44, tag: "Used" },
  { id: 5, img: "👟", title: "Baby Sneakers", price: 39.9, location: "Mossoró, RN", sold: 87, tag: "New" },
  { id: 6, img: "🧩", title: "Puzzle 48pcs", price: 22.5, location: "Natal, RN", sold: 163, tag: "Promo" },
];

const RECOMMENDED = [
  { id: 1, img: "🍼", title: "Feeding Set 6pc", price: 49.9, location: "Mossoró, RN", sold: 320, tag: "New" },
  { id: 2, img: "👶", title: "Cotton Romper", price: 18.9, location: "Natal, RN", sold: 510, tag: "Promo" },
  { id: 3, img: "🧸", title: "Soft Stacking Rings", price: 27.9, location: "Fortaleza, CE", sold: 89, tag: "New" },
  { id: 4, img: "🤱", title: "Nursing Pillow", price: 79.9, location: "Mossoró, RN", sold: 234, tag: "Used" },
  { id: 5, img: "🎨", title: "Washable Crayons", price: 12.9, location: "Recife, PE", sold: 445, tag: "New" },
  { id: 6, img: "🛒", title: "Lightweight Stroller", price: 349.0, location: "Natal, RN", sold: 67, tag: "Promo" },
  { id: 7, img: "💤", title: "Sleep Sack 0-6m", price: 55.9, location: "Mossoró, RN", sold: 178, tag: "New" },
  { id: 8, img: "🎵", title: "Baby Piano Mat", price: 69.9, location: "Fortaleza, CE", sold: 92, tag: "New" },
];

// ─── Tag Color Helper ─────────────────────────────────────────────────────────

const TAG_STYLES = {
  New: "bg-emerald-100 text-emerald-700",
  Used: "bg-sky-100 text-sky-700",
  Promo: "bg-rose-100 text-rose-600",
};

// ─── Components ───────────────────────────────────────────────────────────────

function Header({ cartCount, notifCount }) {
  return (
    <header className="sticky top-0 z-50 bg-amber-400 px-4 pt-4 pb-3 shadow-md">
      <div className="flex items-center gap-3">
        {/* Logo */}
        <div className="flex items-center gap-1 shrink-0">
          <span className="text-2xl">🐝</span>
          <span style={{ fontFamily: "'Fredoka One', cursive" }} className="text-white text-xl font-bold leading-none">
            MommyBee
          </span>
        </div>

        {/* Search */}
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search for baby items..."
            className="w-full rounded-full bg-white py-2 pl-4 pr-10 text-sm text-gray-600 placeholder-gray-400 outline-none shadow-sm focus:ring-2 focus:ring-amber-200"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
          </button>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-3">
          {/* Cart */}
          <button className="relative text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">{cartCount}</span>
            )}
          </button>
          {/* Notif */}
          <button className="relative text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            {notifCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">{notifCount}</span>
            )}
          </button>
          {/* Chat */}
          <button className="text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

function QuickActions() {
  return (
    <div className="bg-white px-4 py-3 border-b border-gray-100">
      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-1">
        {QUICK_ACTIONS.map((a) => (
          <button
            key={a.id}
            className={`flex flex-col items-center gap-1 shrink-0 transition-transform active:scale-95 ${a.highlight ? "scale-105" : ""}`}
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-sm ${a.highlight ? "bg-amber-400 shadow-amber-200 shadow-md" : "bg-amber-50"}`}>
              {a.icon}
            </div>
            <span className={`text-[11px] font-medium whitespace-nowrap ${a.highlight ? "text-amber-600" : "text-gray-500"}`}>{a.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function HeroBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % BANNERS.length), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="px-4 py-3">
      <div className="relative overflow-hidden rounded-2xl h-36 shadow-md">
        {BANNERS.map((b, i) => (
          <div
            key={b.id}
            className={`absolute inset-0 bg-gradient-to-br ${b.bg} flex items-center px-5 transition-opacity duration-700 ${i === current ? "opacity-100" : "opacity-0"}`}
          >
            <div className="flex-1">
              <span className="inline-block bg-white/30 text-white text-[10px] font-bold px-2 py-0.5 rounded-full mb-1">{b.badge}</span>
              <h2 style={{ fontFamily: "'Fredoka One', cursive" }} className="text-white text-2xl font-bold leading-tight">{b.title}</h2>
              <p className="text-white/90 text-xs mt-0.5">{b.sub}</p>
              <button className="mt-2 bg-white text-amber-500 text-xs font-bold px-3 py-1.5 rounded-full shadow hover:shadow-md transition-shadow">
                Shop Now →
              </button>
            </div>
            <span className="text-6xl">{b.emoji}</span>
          </div>
        ))}
        {/* Dots */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
          {BANNERS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all ${i === current ? "bg-white w-4 h-1.5" : "bg-white/50 w-1.5 h-1.5"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function CategoryGrid() {
  return (
    <div className="bg-white mx-4 rounded-2xl shadow-sm p-4 mb-3">
      <div className="grid grid-cols-4 gap-3">
        {CATEGORIES.map((c) => (
          <button key={c.id} className="flex flex-col items-center gap-1.5 group">
            <div className={`w-14 h-14 rounded-2xl ${c.color} flex items-center justify-center text-2xl transition-transform group-active:scale-90 group-hover:scale-105`}>
              {c.icon}
            </div>
            <span className="text-[11px] text-gray-600 font-medium text-center">{c.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function ProductCardHorizontal({ product }) {
  const [pressed, setPressed] = useState(false);
  return (
    <div
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      className={`shrink-0 w-36 bg-white rounded-2xl shadow-sm overflow-hidden cursor-pointer transition-transform ${pressed ? "scale-95" : "hover:scale-[1.02]"}`}
    >
      <div className="bg-amber-50 h-32 flex items-center justify-center text-5xl relative">
        {product.img}
        {product.discount && (
          <span className="absolute top-2 left-2 bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
            -{product.discount}%
          </span>
        )}
        <span className={`absolute top-2 right-2 text-[10px] font-bold px-1.5 py-0.5 rounded-full ${TAG_STYLES[product.tag]}`}>
          {product.tag}
        </span>
      </div>
      <div className="p-2.5">
        <p className="text-xs text-gray-700 font-medium leading-snug line-clamp-2">{product.title}</p>
        <p className="text-amber-500 font-bold text-sm mt-1">R${product.price.toFixed(2)}</p>
        {product.oldPrice && (
          <p className="text-gray-400 text-[11px] line-through">R${product.oldPrice.toFixed(2)}</p>
        )}
      </div>
    </div>
  );
}

function ProductCardGrid({ product }) {
  const [pressed, setPressed] = useState(false);
  return (
    <div
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      className={`bg-white rounded-2xl shadow-sm overflow-hidden cursor-pointer transition-transform ${pressed ? "scale-95" : "hover:scale-[1.02]"}`}
    >
      <div className="bg-amber-50 h-36 flex items-center justify-center text-5xl relative">
        {product.img}
        <span className={`absolute top-2 left-2 text-[10px] font-bold px-1.5 py-0.5 rounded-full ${TAG_STYLES[product.tag]}`}>
          {product.tag}
        </span>
      </div>
      <div className="p-2.5">
        <p className="text-xs text-gray-700 font-medium leading-snug line-clamp-2">{product.title}</p>
        <p className="text-amber-500 font-bold mt-1">R${product.price.toFixed(2)}</p>
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-[10px] text-gray-400 flex items-center gap-0.5">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
            </svg>
            {product.location.split(",")[0]}
          </span>
          <span className="text-[10px] text-gray-400">{product.sold} sold</span>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ title, emoji, action = "See All" }) {
  return (
    <div className="flex items-center justify-between px-4 mb-3">
      <h3 style={{ fontFamily: "'Fredoka One', cursive" }} className="text-lg text-gray-800 font-bold flex items-center gap-1.5">
        <span>{emoji}</span> {title}
      </h3>
      <button className="text-amber-500 text-xs font-semibold hover:underline">{action} →</button>
    </div>
  );
}

function NewUserDeals() {
  return (
    <section className="mb-5">
      <div className="bg-gradient-to-r from-amber-400 to-yellow-300 mx-4 rounded-t-2xl px-4 py-2.5">
        <div className="flex items-center justify-between">
          <span style={{ fontFamily: "'Fredoka One', cursive" }} className="text-white font-bold text-lg">🎁 New User Deals</span>
          <span className="bg-white/30 text-white text-xs px-2 py-0.5 rounded-full font-medium">Limited!</span>
        </div>
      </div>
      <div className="bg-amber-50/50 mx-4 rounded-b-2xl px-4 py-3">
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
          {NEW_USER_DEALS.map((p) => (
            <ProductCardHorizontal key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PopularNearYou() {
  return (
    <section className="mb-5 px-4">
      <SectionHeader title="Popular Near You" emoji="📍" />
      <div className="grid grid-cols-2 gap-3">
        {POPULAR_NEAR.map((p) => (
          <ProductCardGrid key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

function Recommended() {
  return (
    <section className="mb-24 px-4">
      <SectionHeader title="Recommended for You" emoji="✨" />
      <div className="grid grid-cols-2 gap-3">
        {RECOMMENDED.map((p) => (
          <ProductCardGrid key={p.id} product={p} />
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <button className="bg-amber-100 text-amber-600 font-semibold text-sm px-6 py-2.5 rounded-full hover:bg-amber-200 transition-colors">
          Load more 🐝
        </button>
      </div>
    </section>
  );
}

function BottomNav({ active, setActive }) {
  const tabs = [
    { id: "home", icon: "🏠", label: "Home" },
    { id: "categories", icon: "🗂️", label: "Categories" },
    { id: "sell", icon: "➕", label: "Sell", special: true },
    { id: "notifications", icon: "🔔", label: "Alerts" },
    { id: "profile", icon: "👤", label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.07)] z-50 max-w-md mx-auto">
      <div className="flex items-end justify-around px-2 py-2">
        {tabs.map((t) =>
          t.special ? (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className="flex flex-col items-center -mt-5"
            >
              <div className="w-14 h-14 rounded-full bg-amber-400 shadow-lg shadow-amber-300 flex items-center justify-center text-2xl border-4 border-white transition-transform active:scale-90 hover:scale-105">
                {t.icon}
              </div>
              <span className="text-[10px] text-amber-500 font-bold mt-0.5">{t.label}</span>
            </button>
          ) : (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className="flex flex-col items-center py-1 px-2 transition-transform active:scale-90"
            >
              <span className={`text-2xl transition-all ${active === t.id ? "scale-110" : "opacity-60"}`}>{t.icon}</span>
              <span className={`text-[10px] mt-0.5 font-medium ${active === t.id ? "text-amber-500" : "text-gray-400"}`}>{t.label}</span>
              {active === t.id && <div className="w-1 h-1 rounded-full bg-amber-400 mt-0.5" />}
            </button>
          )
        )}
      </div>
    </nav>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function MommyBee() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <>
      {/* Google Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;500;600;700&display=swap');
        * { font-family: 'Nunito', sans-serif; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>

      <div className="min-h-screen bg-gray-50 max-w-md mx-auto relative">
        <Header cartCount={3} notifCount={7} />

        <main className="overflow-y-auto">
          <QuickActions />
          <HeroBanner />
          <CategoryGrid />
          <NewUserDeals />

          {/* Divider banner */}
          <div className="mx-4 mb-5 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-2xl p-4 flex items-center gap-3">
            <span className="text-3xl">🐝</span>
            <div>
              <p className="text-amber-800 font-bold text-sm">Sell your baby items!</p>
              <p className="text-amber-600 text-xs">Join 50k+ moms buying & selling safely</p>
            </div>
            <button className="ml-auto bg-amber-400 text-white text-xs font-bold px-3 py-2 rounded-full whitespace-nowrap hover:bg-amber-500 transition-colors">
              Start →
            </button>
          </div>

          <PopularNearYou />
          <Recommended />
        </main>

        <BottomNav active={activeTab} setActive={setActiveTab} />
      </div>
    </>
  );
}
