import { useState } from "react";

const MOCK_WISHLISTS = [
  {
    id: "wb-001",
    type: "baby",
    title: "Enxoval Meu Bebê",
    eventDate: "2026-06-15",
    items: [
      { id: 1, name: "Berço Completo", price: 899, image: "🛏️" },
      { id: 2, name: "Carrinho 3 em 1", price: 599, image: "🚼" },
      { id: 3, name: "Bomba de Amamentação", price: 299, image: "🍼" },
      { id: 4, name: "Cadeira de Alimentação", price: 349, image: "🪑" },
    ],
  },
  {
    id: "wc-001",
    type: "wedding",
    title: "Casamento - João & Maria",
    eventDate: "2026-09-20",
    items: [
      { id: 1, name: "Jogo de Panelas", price: 450, image: "🍳" },
      { id: 2, name: "Liquidificador Premium", price: 299, image: "🥤" },
      { id: 3, name: "Jogo de Cama King", price: 380, image: "🛏️" },
    ],
  },
];

const FREE_CUPONS = [
  {
    id: 1,
    code: "BEBE10",
    discount: 10,
    type: "percent",
    minValue: 50,
    expires: "2026-05-31",
    description: "10%off compras above R$50",
    claimed: false,
  },
  {
    id: 2,
    code: "FREESHIPNOW",
    discount: 0,
    type: "shipping",
    minValue: 39,
    expires: "2026-05-15",
    description: "Frete Grátis pedido above R$39",
    claimed: false,
  },
  {
    id: 3,
    code: "R$20OFF",
    discount: 20,
    type: "fixed",
    minValue: 100,
    expires: "2026-06-01",
    description: "R$20off above R$100",
    claimed: false,
  },
];

const COMMUNITY_POSTS = [
  {
    id: 1,
    author: "Ana Paula",
    avatar: "👩",
    content: "Alguém sabe onde encontrar fralda tamanho newborn no RJ?",
    time: "2h atrás",
    likes: 5,
    comments: 12,
  },
  {
    id: 2,
    author: "Mariana",
    avatar: "👱‍♀️",
    content: "Meu filho adorou essa papinha! Recomendo! 😊",
    time: "4h atrás",
    likes: 23,
    comments: 8,
  },
  {
    id: 3,
    author: "Carla",
    avatar: "👩‍🦰",
    content: "Vendi todos os meus itens usados em 1 semana! Amei a plataforma!",
    time: "1d atrás",
    likes: 45,
    comments: 15,
  },
];

const FREE_GIFTS = [
  {
    id: 1,
    title: "Amostra de Pomada",
    image: "🧴",
    requiredAction: "Responda pesquisa",
  },
  {
    id: 2,
    title: "Chupeta Premium",
    image: "🍼",
    requiredAction: "Siga Instagram",
  },
  { id: 3, title: "Cupom R$5", image: "🎟️", requiredAction: "Indique 1 amiga" },
];

export default function Social({ onBack }) {
  const [activeTab, setActiveTab] = useState("benefits");
  const [wishlists, setWishlists] = useState(MOCK_WISHLISTS);
  const [selectedWishlist, setSelectedWishlist] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [coupons, setCoupons] = useState(FREE_CUPONS);
  const [newWishlist, setNewWishlist] = useState({
    type: "baby",
    title: "",
    eventDate: "",
  });
  const [showCommunity, setShowCommunity] = useState(false);

  const handleCreateWishlist = () => {
    if (!newWishlist.title.trim()) return;
    const wishlist = {
      id: `w${Date.now()}`,
      type: newWishlist.type,
      title: newWishlist.title,
      eventDate: newWishlist.eventDate,
      items: [],
    };
    setWishlists([wishlist, ...wishlists]);
    setShowCreateModal(false);
    setNewWishlist({ type: "baby", title: "", eventDate: "" });
    setSelectedWishlist(wishlist);
  };

  const claimCoupon = (id) => {
    setCoupons(coupons.map((c) => (c.id === id ? { ...c, claimed: true } : c)));
    alert("Cupom resgatado! Use em seu próximo pedido.");
  };

  const copyShareLink = (id) => {
    const link = `${window.location.origin}/social/${id}`;
    navigator.clipboard.writeText(link);
    alert("Link copiado!");
  };

  const tabs = [
    { id: "benefits", label: "Benefícios", icon: "🎁" },
    { id: "wishlists", label: "Enxovais", icon: "🎁" },
    { id: "community", label: "Comunidade", icon: "💬" },
  ];

  const renderBenefits = () => (
    <div className="p-4 space-y-6">
      <div className="bg-gradient-to-r from-amber-400 to-orange-400 rounded-3xl p-5 text-white shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">🎟️</span>
          <div>
            <h2 className="font-bold text-lg">Cupons Grátis</h2>
            <p className="text-white/80 text-sm">Exclusive para mamães</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-bold text-gray-700 mb-3">🎁 Cupons Disponíveis</h3>
        <div className="space-y-3">
          {coupons.map((coupon) => (
            <div
              key={coupon.id}
              className="bg-white rounded-2xl p-4 shadow-sm border border-amber-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-amber-600 text-lg">
                    {coupon.code}
                  </p>
                  <p className="text-sm text-gray-600">{coupon.description}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Validade: {coupon.expires}
                  </p>
                </div>
                {coupon.claimed ? (
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    Resgatado
                  </span>
                ) : (
                  <button
                    onClick={() => claimCoupon(coupon.id)}
                    className="bg-amber-400 text-white font-bold px-4 py-2 rounded-full text-sm"
                  >
                    Resgatar
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-bold text-gray-700 mb-3">🎁 Presentes Grátis</h3>
        <p className="text-xs text-gray-500 mb-3">
          Complete ações para ganhar!
        </p>
        <div className="grid grid-cols-1 gap-3">
          {FREE_GIFTS.map((gift) => (
            <div
              key={gift.id}
              className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-4"
            >
              <div className="text-3xl">{gift.image}</div>
              <div className="flex-1">
                <p className="font-bold text-gray-800">{gift.title}</p>
                <p className="text-xs text-gray-500">{gift.requiredAction}</p>
              </div>
              <button className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-medium">
                Pegar
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-bold text-gray-700 mb-3">⭐ Programa de Pontos</h3>
        <div className="bg-gradient-to-r from-yellow-100 to-amber-100 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-2xl font-bold text-amber-600">150 pontos</p>
              <p className="text-xs text-gray-600">Você está no nível Prata</p>
            </div>
            <div className="text-3xl">🏅</div>
          </div>
          <div className="bg-white rounded-xl p-3">
            <p className="text-xs text-gray-600 mb-2">
              Próximo nível: Ouro (500 pontos)
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-amber-400 h-2 rounded-full"
                style={{ width: "30%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCommunity = () => (
    <div className="p-4 space-y-4">
      <button
        onClick={() => setShowCommunity(true)}
        className="w-full bg-amber-400 text-white font-bold py-3 rounded-xl"
      >
        + Nova Publicação
      </button>

      <div className="space-y-3">
        {COMMUNITY_POSTS.map((post) => (
          <div key={post.id} className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="text-2xl">{post.avatar}</div>
              <div>
                <p className="font-bold text-gray-800">{post.author}</p>
                <p className="text-xs text-gray-400">{post.time}</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-3">{post.content}</p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <button className="flex items-center gap-1">
                <span>❤️</span> {post.likes}
              </button>
              <button className="flex items-center gap-1">
                <span>💬</span> {post.comments}
              </button>
              <button className="flex items-center gap-1">
                <span>📤</span> Compartilhar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderWishlists = () => {
    if (selectedWishlist) {
      const total = selectedWishlist.items.reduce(
        (sum, item) => sum + item.price,
        0,
      );
      return (
        <div className="p-4 pb-24">
          <button
            onClick={() => setSelectedWishlist(null)}
            className="text-amber-500 font-medium flex items-center gap-1 mb-4"
          >
            ← Voltar
          </button>

          <div
            className={`rounded-3xl p-6 mb-6 text-white shadow-lg ${selectedWishlist.type === "baby" ? "bg-gradient-to-br from-pink-400 to-rose-400" : "bg-gradient-to-br from-purple-400 to-violet-500"}`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">
                {selectedWishlist.type === "baby" ? "👶" : "💒"}
              </span>
              <span className="text-white/80 text-sm font-medium">
                {selectedWishlist.type === "baby"
                  ? "Enxoval de Bebê"
                  : "Lista de Casamento"}
              </span>
            </div>
            <h1 className="text-2xl font-bold mb-1">
              {selectedWishlist.title}
            </h1>
            <p className="text-white/80 text-sm mb-4">
              Data:{" "}
              {new Date(selectedWishlist.eventDate).toLocaleDateString("pt-BR")}
            </p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-xs">Total estimado</p>
                <p className="text-2xl font-bold">
                  R$ {total.toLocaleString("pt-BR")}
                </p>
              </div>
              <button
                onClick={() => copyShareLink(selectedWishlist.id)}
                className="bg-white text-gray-800 font-bold py-2.5 px-5 rounded-full flex items-center gap-2 shadow-md"
              >
                📤 Compartilhar
              </button>
            </div>
          </div>

          {selectedWishlist.items.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <span className="text-4xl mb-3 block">📦</span>
              <p>Nenhum item adicionado ainda</p>
              <button className="text-amber-500 font-medium mt-2">
                Adicionar primeiro item
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {selectedWishlist.items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-4"
                >
                  <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center text-2xl">
                    {item.image}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800">{item.name}</h4>
                    <p className="text-amber-500 font-bold">
                      R$ {item.price.toLocaleString("pt-BR")}
                    </p>
                  </div>
                  <button className="text-gray-400 hover:text-rose-500">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 bg-gray-50 rounded-2xl p-4 border border-gray-200">
            <h4 className="font-bold text-gray-700 mb-2">
              Link de Compartilhamento
            </h4>
            <div className="flex items-center gap-2">
              <input
                readOnly
                value={`${window.location.origin}/social/${selectedWishlist.id}`}
                className="flex-1 bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-600"
              />
              <button
                onClick={() => copyShareLink(selectedWishlist.id)}
                className="bg-amber-400 text-white font-bold py-2 px-4 rounded-xl"
              >
                Copiar
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="p-4">
        <button
          onClick={onBack}
          className="text-amber-500 font-medium flex items-center gap-1 mb-6"
        >
          ← Voltar
        </button>

        <div className="bg-gradient-to-r from-amber-400 to-orange-400 rounded-3xl p-6 mb-6 text-white shadow-lg shadow-amber-200">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🎁</span>
            <div>
              <h2 className="font-bold text-lg">Monte seu Enxoval</h2>
              <p className="text-white/80 text-sm">
                Compartilhe com família e amigos
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="mt-3 bg-white text-amber-500 font-bold py-2.5 px-5 rounded-full shadow-md transition-transform active:scale-95 hover:scale-105"
          >
            + Criar Enxoval
          </button>
        </div>

        <h3 className="font-bold text-gray-700 mb-3">Meus Enxovais</h3>
        <div className="space-y-3">
          {wishlists.map((w) => (
            <div
              key={w.id}
              onClick={() => setSelectedWishlist(w)}
              className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-4 transition-transform active:scale-[0.98] cursor-pointer"
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${w.type === "baby" ? "bg-pink-100" : "bg-purple-100"}`}
              >
                {w.type === "baby" ? "👶" : "💒"}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-800">{w.title}</h4>
                <p className="text-sm text-gray-500">
                  {w.items.length} itens •{" "}
                  {new Date(w.eventDate).toLocaleDateString("pt-BR")}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  copyShareLink(w.id);
                }}
                className="bg-amber-100 text-amber-600 p-2 rounded-xl"
              >
                📤
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (showCreateModal) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-end md:items-center justify-center z-50">
        <div className="bg-white rounded-t-3xl md:rounded-3xl w-full max-w-md p-6 animate-slide-up">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Criar Enxoval</h2>
            <button
              onClick={() => setShowCreateModal(false)}
              className="text-gray-400 text-2xl"
            >
              ×
            </button>
          </div>

          <div className="flex gap-3 mb-6">
            <button
              onClick={() => setNewWishlist({ ...newWishlist, type: "baby" })}
              className={`flex-1 p-4 rounded-2xl border-2 transition-all ${newWishlist.type === "baby" ? "border-pink-400 bg-pink-50" : "border-gray-200"}`}
            >
              <span className="text-3xl block mb-1">👶</span>
              <span
                className={`font-bold ${newWishlist.type === "baby" ? "text-pink-500" : "text-gray-500"}`}
              >
                Enxoval de Bebê
              </span>
            </button>
            <button
              onClick={() =>
                setNewWishlist({ ...newWishlist, type: "wedding" })
              }
              className={`flex-1 p-4 rounded-2xl border-2 transition-all ${newWishlist.type === "wedding" ? "border-purple-400 bg-purple-50" : "border-gray-200"}`}
            >
              <span className="text-3xl block mb-1">💒</span>
              <span
                className={`font-bold ${newWishlist.type === "wedding" ? "text-purple-500" : "text-gray-500"}`}
              >
                Casamento
              </span>
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome do Enxoval
              </label>
              <input
                type="text"
                value={newWishlist.title}
                onChange={(e) =>
                  setNewWishlist({ ...newWishlist, title: e.target.value })
                }
                placeholder={
                  newWishlist.type === "baby"
                    ? "Ex: Enxoval Meu Bebê"
                    : "Ex: Casamento João & Maria"
                }
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-amber-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data do Evento
              </label>
              <input
                type="date"
                value={newWishlist.eventDate}
                onChange={(e) =>
                  setNewWishlist({ ...newWishlist, eventDate: e.target.value })
                }
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-amber-200"
              />
            </div>
          </div>

          <button
            onClick={handleCreateWishlist}
            disabled={!newWishlist.title.trim()}
            className="w-full bg-amber-400 text-white font-bold py-4 rounded-xl mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Criar Enxoval
          </button>
        </div>
      </div>
    );
  }

  if (activeTab === "benefits") {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-amber-400 px-4 py-4 sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="text-white">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <h1 className="text-xl font-bold text-white">Benefícios</h1>
          </div>
        </div>

        <div className="flex overflow-x-auto gap-1 bg-white border-b border-gray-100 px-2 py-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-fit px-3 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "bg-amber-100 text-amber-700"
                  : "text-gray-500"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {renderBenefits()}
      </div>
    );
  }

  if (activeTab === "wishlists") {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-amber-400 px-4 py-4 sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="text-white">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <h1 className="text-xl font-bold text-white">Enxovais</h1>
          </div>
        </div>

        <div className="flex overflow-x-auto gap-1 bg-white border-b border-gray-100 px-2 py-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-fit px-3 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "bg-amber-100 text-amber-700"
                  : "text-gray-500"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {renderWishlists()}
      </div>
    );
  }

  if (activeTab === "community") {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-amber-400 px-4 py-4 sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="text-white">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <h1 className="text-xl font-bold text-white">Comunidade</h1>
          </div>
        </div>

        <div className="flex overflow-x-auto gap-1 bg-white border-b border-gray-100 px-2 py-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-fit px-3 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "bg-amber-100 text-amber-700"
                  : "text-gray-500"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {renderCommunity()}
      </div>
    );
  }

  return renderBenefits();
}
