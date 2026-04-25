import ProductCardGrid from "../ui/ProductCardGrid";
import SectionHeader from "../ui/SectionHeader";
import { RECOMMENDED } from "../../data/mockData";

export default function Recommended() {
  return (
    <section className="mb-24 md:mb-12 px-4 md:px-0">
      <SectionHeader title="Recommended for You" emoji="✨" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
        {RECOMMENDED.map((p) => (
          <ProductCardGrid key={p.id} product={p} />
        ))}
      </div>
      <div className="mt-4 md:mt-6 flex justify-center">
        <button className="bg-amber-100 text-amber-600 font-semibold text-sm md:text-base px-6 py-2.5 md:px-8 md:py-3 rounded-full hover:bg-amber-200 transition-colors">
          Load more 🐝
        </button>
      </div>
    </section>
  );
}
