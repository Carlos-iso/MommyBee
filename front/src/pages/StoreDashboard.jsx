import { useState, useEffect } from "react";
import { api } from "../services/api";
import { SELL_CATEGORIES } from "../data/mockData";

export default function StoreDashboard({ onBack }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [seller, setSeller] = useState(null);
  const [products, setProducts] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);

  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    condition: "New",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const sellerData = await api.getMySeller();
      setSeller(sellerData);
      const savedProducts = JSON.parse(
        localStorage.getItem("myProducts") || "[]",
      );
      setProducts(savedProducts);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddProduct = () => {
    const product = {
      ...newProduct,
      id: Date.now(),
      sellerId: seller?._id,
      createdAt: new Date().toISOString(),
      views: 0,
      likes: 0,
    };
    const updated = [...products, product];
    setProducts(updated);
    localStorage.setItem("myProducts", JSON.stringify(updated));
    setShowAddProduct(false);
    setNewProduct({
      title: "",
      description: "",
      price: "",
      category: "",
      condition: "New",
    });
  };

  const handleDeleteProduct = (id) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    localStorage.setItem("myProducts", JSON.stringify(updated));
  };

  const stats = {
    totalSales: products.length * 12,
    totalRevenue: products.reduce(
      (sum, p) => sum + (Number(p.price) || 0) * 3,
      0,
    ),
    totalViews: products.reduce((sum, p) => sum + (p.views || 0), 0),
  };

  const tabs = [
    { id: "overview", label: "Visao Geral", icon: "📊" },
    { id: "products", label: "Meus Produtos", icon: "📦" },
    { id: "orders", label: "Pedidos", icon: "🛒" },
    { id: "settings", label: "Config", icon: "⚙️" },
  ];

  const renderOverview = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="text-2xl font-bold text-amber-500">
            {stats.totalSales}
          </p>
          <p className="text-xs text-gray-500">Vendas</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="text-2xl font-bold text-emerald-500">
            R${stats.totalRevenue}
          </p>
          <p className="text-xs text-gray-500">Faturamento</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm col-span-2">
          <p className="text-2xl font-bold text-gray-800">{stats.totalViews}</p>
          <p className="text-xs text-gray-500">Visualizacoes totais</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <h3 className="font-bold text-gray-800 mb-3">Acoes Rapidas</h3>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setShowAddProduct(true)}
            className="p-4 bg-amber-50 rounded-xl text-center hover:bg-amber-100 transition-colors"
          >
            <span className="text-2xl block mb-1">➕</span>
            <span className="text-sm font-medium text-amber-700">
              Novo Produto
            </span>
          </button>
          <button
            onClick={() => onBack && onBack("sell")}
            className="p-4 bg-gray-50 rounded-xl text-center hover:bg-gray-100 transition-colors"
          >
            <span className="text-2xl block mb-1">📷</span>
            <span className="text-sm font-medium text-gray-700">
              Ver Minha Loja
            </span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="space-y-3">
      {products.length === 0 ? (
        <div className="text-center py-12">
          <span className="text-5xl block mb-3">📦</span>
          <p className="text-gray-500 font-medium">Nenhum produto ainda</p>
          <button
            onClick={() => setShowAddProduct(true)}
            className="mt-3 bg-amber-400 text-white px-4 py-2 rounded-full font-medium"
          >
            + Primeiro Produto
          </button>
        </div>
      ) : (
        products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl p-4 shadow-sm flex gap-3"
          >
            <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
              {SELL_CATEGORIES.find((c) => c.label === product.category)
                ?.icon || "📦"}
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-800">{product.title}</h4>
              <p className="text-xs text-gray-500">
                {product.category} • {product.condition}
              </p>
              <p className="text-amber-500 font-bold mt-1">R${product.price}</p>
            </div>
            <button
              onClick={() => handleDeleteProduct(product.id)}
              className="text-gray-400 hover:text-rose-500"
            >
              🗑️
            </button>
          </div>
        ))
      )}
    </div>
  );

  const renderOrders = () => (
    <div className="text-center py-12">
      <span className="text-5xl block mb-3">🛒</span>
      <p className="text-gray-500 font-medium">Nenhum pedido ainda</p>
      <p className="text-xs text-gray-400 mt-1">
        Compartilhe seus produtos para receber pedidos!
      </p>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <h3 className="font-bold text-gray-800 mb-3">Dados da Loja</h3>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-500">Nome da Loja</label>
            <p className="font-medium">{seller?.storeName || "Minha Loja"}</p>
          </div>
          <div>
            <label className="text-xs text-gray-500">Status</label>
            <p className="font-medium text-emerald-600">✅ Ativa</p>
          </div>
        </div>
      </div>

      <button className="w-full bg-rose-50 text-rose-600 font-bold py-3 rounded-xl hover:bg-rose-100 transition-colors">
        Sair da Conta
      </button>
    </div>
  );

  if (showAddProduct) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-amber-400 px-4 py-4 sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddProduct(false)}
              className="text-white"
            >
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
            <h1 className="text-xl font-bold text-white">Novo Produto</h1>
          </div>
        </div>

        <div className="p-4 space-y-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Titulo
                </label>
                <input
                  type="text"
                  value={newProduct.title}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, title: e.target.value })
                  }
                  placeholder="Ex: Baby Onesie Set"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preco (R$)
                </label>
                <input
                  type="number"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, price: e.target.value })
                  }
                  placeholder="0.00"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Categoria
                </label>
                <select
                  value={newProduct.category}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, category: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none"
                >
                  <option value="">Selecione...</option>
                  {SELL_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.label}>
                      {cat.icon} {cat.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <button
            onClick={handleAddProduct}
            disabled={
              !newProduct.title || !newProduct.price || !newProduct.category
            }
            className="w-full bg-amber-400 text-white font-bold py-4 rounded-xl disabled:opacity-50 hover:bg-amber-500 transition-colors"
          >
            Publicar Produto
          </button>
        </div>
      </div>
    );
  }

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
          <div>
            <h1 className="text-xl font-bold text-white">
              {seller?.storeName || "Minha Loja"}
            </h1>
            <p className="text-white/70 text-xs">{products.length} produtos</p>
          </div>
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

      <div className="p-4">
        {activeTab === "overview" && renderOverview()}
        {activeTab === "products" && renderProducts()}
        {activeTab === "orders" && renderOrders()}
        {activeTab === "settings" && renderSettings()}
      </div>
    </div>
  );
}
