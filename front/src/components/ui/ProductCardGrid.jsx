import { useState } from "react";
import { TAG_STYLES } from "../../data/mockData";

export default function ProductCardGrid({ product }) {
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
      <div className="bg-amber-50 h-36 md:h-48 flex items-center justify-center text-5xl md:text-6xl relative">
        {product.img}
        <span className={`absolute top-2 left-2 text-[10px] md:text-xs font-bold px-1.5 py-0.5 rounded-full ${TAG_STYLES[product.tag]}`}>
          {product.tag}
        </span>
      </div>
      <div className="p-2.5 md:p-4">
        <p className="text-xs md:text-sm text-gray-700 font-medium leading-snug line-clamp-2">{product.title}</p>
        <p className="text-amber-500 font-bold mt-1 md:text-lg">R${product.price.toFixed(2)}</p>
        <div className="flex items-center justify-between mt-1.5 md:mt-2">
          <span className="text-[10px] md:text-xs text-gray-400 flex items-center gap-0.5">
            <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
            </svg>
            {product.location.split(",")[0]}
          </span>
          <span className="text-[10px] md:text-xs text-gray-400">{product.sold} sold</span>
        </div>
      </div>
    </div>
  );
}
