import ProductCardGrid from "../ui/ProductCardGrid";
import SectionHeader from "../ui/SectionHeader";
import { POPULAR_NEAR } from "../../data/mockData";

export default function PopularNearYou() {
  return (
    <section className="mb-5 md:mb-8 px-4 md:px-0">
      <SectionHeader title="Popular Near You" emoji="📍" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
        {POPULAR_NEAR.map((p) => (
          <ProductCardGrid key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
