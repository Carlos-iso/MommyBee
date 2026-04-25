import { useState } from "react";
import { SELL_CATEGORIES } from "../data/mockData";

export default function Sell({ onBack }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    condition: "",
    images: [],
  });

  const handleSubmit = () => {
    const items = JSON.parse(localStorage.getItem("sellItems") || "[]");
    items.push({ ...formData, id: Date.now(), date: new Date().toISOString() });
    localStorage.setItem("sellItems", JSON.stringify(items));
    alert("Item listed successfully! 🐝");
    setStep(1);
    setFormData({ title: "", description: "", price: "", category: "", condition: "", images: [] });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-amber-400 px-4 py-4 sticky top-0 z-40">
        <div className="flex items-center gap-3 md:max-w-2xl md:mx-auto">
          <button onClick={onBack} className="text-white hover:text-amber-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-white">Sell an Item</h1>
        </div>
      </div>

      <div className="md:max-w-2xl md:mx-auto md:px-4 py-6 px-4">
        {step === 1 && (
          <>
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Escolha uma Categoria</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {SELL_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setFormData({ ...formData, category: cat.label })}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.category === cat.label
                        ? "border-amber-400 bg-amber-50"
                        : "border-gray-100 hover:border-amber-200"
                    }`}
                  >
                    <div className="text-2xl mb-1">{cat.icon}</div>
                    <div className="text-xs font-medium text-gray-700">{cat.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Detalhes do Item</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Baby Onesie Set"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe your item..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Price (R$)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="0.00"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => formData.category && formData.title && formData.price && setStep(2)}
              disabled={!formData.category || !formData.title || !formData.price}
              className="w-full bg-amber-400 text-white font-bold py-4 rounded-2xl text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-amber-500 transition-colors"
            >
              Continue
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Condition</h2>
              <div className="flex gap-3">
                {["New", "Like New", "Good", "Fair"].map((cond) => (
                  <button
                    key={cond}
                    onClick={() => setFormData({ ...formData, condition: cond })}
                    className={`flex-1 py-3 rounded-xl border-2 font-medium transition-all ${
                      formData.condition === cond
                        ? "border-amber-400 bg-amber-50 text-amber-600"
                        : "border-gray-100 text-gray-600 hover:border-amber-200"
                    }`}
                  >
                    {cond}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Photos</h2>
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
                <div className="text-4xl mb-2">📷</div>
                <p className="text-gray-500 text-sm">Tap to add photos</p>
                <p className="text-gray-400 text-xs mt-1">Up to 5 photos recommended</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
              <h2 className="text-lg font-bold text-gray-800 mb-2">Summary</h2>
              <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Category:</span>
                  <span className="font-medium">{formData.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Title:</span>
                  <span className="font-medium">{formData.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Price:</span>
                  <span className="font-bold text-amber-500">R${formData.price}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 bg-gray-100 text-gray-700 font-bold py-4 rounded-2xl hover:bg-gray-200 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 bg-amber-400 text-white font-bold py-4 rounded-2xl hover:bg-amber-500 transition-colors"
              >
                Publish Item
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
