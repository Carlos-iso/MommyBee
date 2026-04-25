import { useState } from "react";
import { TAG_STYLES } from "../../data/mockData";

export default function ProductCardHorizontal({ product }) {
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
