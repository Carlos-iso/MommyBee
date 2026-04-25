import { CATEGORIES } from "../../data/mockData";

export default function CategoryGrid() {
  return (
    <div className="bg-white mx-4 md:mx-0 rounded-2xl shadow-sm p-4 md:p-6 mb-3 md:mb-6">
      <div className="grid grid-cols-4 md:grid-cols-8 gap-3 md:gap-6">
        {CATEGORIES.map((c) => (
          <button key={c.id} className="flex flex-col items-center gap-1.5 group">
            <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl ${c.color} flex items-center justify-center text-2xl md:text-3xl transition-transform group-active:scale-90 group-hover:scale-105`}>
              {c.icon}
            </div>
            <span className="text-[11px] md:text-xs text-gray-600 font-medium text-center">{c.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
