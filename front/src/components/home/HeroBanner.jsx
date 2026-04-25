import { useState, useEffect } from "react";
import { BANNERS } from "../../data/mockData";

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % BANNERS.length), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="px-4 py-3 md:px-0 md:py-6">
      <div className="relative overflow-hidden rounded-2xl h-36 md:h-64 shadow-md">
        {BANNERS.map((b, i) => (
          <div
            key={b.id}
            className={`absolute inset-0 bg-gradient-to-br ${b.bg} flex items-center px-5 md:px-12 transition-opacity duration-700 ${i === current ? "opacity-100" : "opacity-0"}`}
          >
            <div className="flex-1">
              <span className="inline-block bg-white/30 text-white text-[10px] md:text-sm font-bold px-2 py-0.5 rounded-full mb-1 md:mb-2">{b.badge}</span>
              <h2 style={{ fontFamily: "'Fredoka One', cursive" }} className="text-white text-2xl md:text-4xl font-bold leading-tight">{b.title}</h2>
              <p className="text-white/90 text-xs md:text-base mt-0.5 md:mt-2">{b.sub}</p>
              <button className="mt-2 bg-white text-amber-500 text-xs md:text-sm font-bold px-3 py-1.5 md:px-5 md:py-2.5 rounded-full shadow hover:shadow-md transition-shadow">
                Comprar Agora →
              </button>
            </div>
            <span className="text-6xl md:text-8xl">{b.emoji}</span>
          </div>
        ))}
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 md:bottom-4">
          {BANNERS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all ${i === current ? "bg-white w-4 h-1.5 md:w-6 md:h-2" : "bg-white/50 w-1.5 h-1.5 md:w-2 md:h-2"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
