import { QUICK_ACTIONS } from "../../data/mockData";

export default function QuickActions() {
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
