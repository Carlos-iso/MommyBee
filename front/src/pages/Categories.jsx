import { CATEGORIES, POPULAR_NEAR, RECOMMENDED } from "../data/mockData";
import ProductCardGrid from "../components/ui/ProductCardGrid";

export default function Categories({ onBack }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100 px-4 py-4 sticky top-0 z-40">
        <div className="flex items-center gap-3 md:max-w-6xl md:mx-auto">
          <button onClick={onBack} className="text-amber-500 hover:text-amber-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-gray-800">Categories</h1>
        </div>
      </div>

      <div className="md:max-w-6xl md:mx-auto md:px-4 py-4">
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3 md:gap-6 px-4 md:px-0 mb-6">
          {CATEGORIES.map((c) => (
            <button key={c.id} className="flex flex-col items-center gap-1.5 group">
              <div className={`w-14 h-14 md:w-20 md:h-20 rounded-2xl ${c.color} flex items-center justify-center text-2xl md:text-3xl transition-transform group-active:scale-90 group-hover:scale-105 shadow-sm`}>
                {c.icon}
              </div>
              <span className="text-xs md:text-sm text-gray-600 font-medium text-center">{c.label}</span>
            </button>
          ))}
        </div>

        <div className="px-4 md:px-0">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Popular in Clothes</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
            {POPULAR_NEAR.slice(0, 6).map((product) => (
              <ProductCardGrid key={product.id} product={product} />
            ))}
          </div>
        </div>

        <div className="px-4 md:px-0 mt-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Recommended for You</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
            {RECOMMENDED.slice(0, 6).map((product) => (
              <ProductCardGrid key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
