import ProductCardHorizontal from "../ui/ProductCardHorizontal";
import { NEW_USER_DEALS } from "../../data/mockData";

export default function NewUserDeals() {
  return (
    <section className="mb-5 md:mb-8">
      <div className="bg-gradient-to-r from-amber-400 to-yellow-300 mx-4 md:mx-0 rounded-t-2xl px-4 py-2.5 md:px-6 md:py-4">
        <div className="flex items-center justify-between">
          <span style={{ fontFamily: "'Fredoka One', cursive" }} className="text-white font-bold text-lg md:text-xl">🎁 New User Deals</span>
          <span className="bg-white/30 text-white text-xs px-2 py-0.5 rounded-full font-medium md:text-sm">Limited!</span>
        </div>
      </div>
      <div className="bg-amber-50/50 mx-4 md:mx-0 rounded-b-2xl px-4 py-3 md:px-6 md:py-5">
        <div className="flex gap-3 md:gap-5 overflow-x-auto no-scrollbar pb-1 md:pb-2">
          {NEW_USER_DEALS.map((p) => (
            <ProductCardHorizontal key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
