import { useState } from "react";
import Header from "../components/layout/Header";
import BottomNav from "../components/layout/BottomNav";
import QuickActions from "../components/home/QuickActions";
import HeroBanner from "../components/home/HeroBanner";
import CategoryGrid from "../components/home/CategoryGrid";
import NewUserDeals from "../components/home/NewUserDeals";
import PopularNearYou from "../components/home/PopularNearYou";
import Recommended from "../components/home/Recommended";
import "../styles/global.css";

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");
  const [showCart, setShowCart] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 w-full mx-auto relative">
      <main className="overflow-y-auto pb-20 md:pb-8">
        <div className="md:max-w-6xl md:mx-auto md:px-4">
          <QuickActions />
          <HeroBanner />
          <CategoryGrid />
          <NewUserDeals />

          <div className="mx-4 mb-5 md:mb-8 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-2xl p-4 md:p-6 flex items-center gap-3 md:gap-6">
            <span className="text-3xl md:text-5xl">🐝</span>
            <div>
              <p className="text-amber-800 font-bold text-sm md:text-base">
                Venda seus itens de bebê!
              </p>
              <p className="text-amber-600 text-xs md:text-sm">
                Junte-se a 50k+ mamães comprando e vendendo com segurança
              </p>
            </div>
            <button className="ml-auto bg-amber-400 text-white text-xs md:text-sm font-bold px-3 py-2 md:px-5 md:py-2.5 rounded-full whitespace-nowrap hover:bg-amber-500 transition-colors">
              Start →
            </button>
          </div>

          <PopularNearYou />
          <Recommended />
        </div>
      </main>

      <BottomNav active={activeTab} setActive={setActiveTab} />
    </div>
  );
}
