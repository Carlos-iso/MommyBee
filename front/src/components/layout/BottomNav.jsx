export default function BottomNav({ active, setActive }) {
  const tabs = [
    { id: "home", icon: "🏠", label: "Início" },
    { id: "social", icon: "👥", label: "Social" },
    { id: "sell", icon: "➕", label: "Vender", special: true },
    { id: "benefits", icon: "🎁", label: "Enxoval" },
    { id: "profile", icon: "👤", label: "Perfil" },
  ];

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.07)] z-50 w-full mx-auto md:hidden">
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

      <nav className="hidden md:flex fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-100 shadow-sm z-50">
        <div className="max-w-6xl mx-auto w-full flex items-center justify-between px-6">
          <div className="flex items-center gap-1 cursor-pointer">
            <span className="text-2xl">🐝</span>
            <span style={{ fontFamily: "'Fredoka One', cursive" }} className="text-xl text-amber-500 font-bold">MommyBee</span>
          </div>
          <div className="flex items-center gap-8">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={`flex items-center gap-2 transition-colors ${active === t.id ? "text-amber-500" : "text-gray-500 hover:text-amber-500"}`}
              >
                <span className="text-xl">{t.icon}</span>
                <span className="font-medium">{t.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
