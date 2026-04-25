import { useState, useEffect } from "react";
import { api } from "../services/api";

export default function BecomeSeller({ onBack, onSuccess }) {
  const [step, setStep] = useState(1);
  const [sellerStatus, setSellerStatus] = useState(null);
  const [formData, setFormData] = useState({
    storeName: "",
    storeDescription: "",
    cpf: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    checkSellerStatus();
  }, []);

  const checkSellerStatus = async () => {
    try {
      const status = await api.getMySeller();
      setSellerStatus(status);
    } catch (err) {
      setSellerStatus(null);
    }
  };

  const formatCPF = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
      .slice(0, 14);
  };

  const handleChange = (field) => (e) => {
    const value = field === "cpf" ? formatCPF(e.target.value) : e.target.value;
    setFormData({ ...formData, [field]: value });
    setError("");
  };

  const handleApply = async () => {
    if (!formData.storeName.trim()) {
      setError("Nome da loja é obrigatório");
      return;
    }
    if (formData.cpf.length < 14) {
      setError("CPF completo é obrigatório");
      return;
    }

    setLoading(true);
    try {
      const result = await api.applySeller({
        storeName: formData.storeName,
        storeDescription: formData.storeDescription,
        cpf: formData.cpf.replace(/\D/g, ""),
      });
      setSellerStatus(result);
      if (onSuccess) onSuccess(result);
    } catch (err) {
      setError(err.message || "Erro ao enviar candidatura");
    } finally {
      setLoading(false);
    }
  };

  if (sellerStatus) {
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
            <h1 className="text-xl font-bold text-white">Minha Loja</h1>
          </div>
        </div>

        <div className="p-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm text-center mb-6">
            <div className="text-5xl mb-3">🏪</div>
            <h2 className="text-xl font-bold text-gray-800">
              {sellerStatus.storeName}
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              {sellerStatus.storeDescription || "Minha loja"}
            </p>
            <div
              className={`inline-block mt-3 px-3 py-1 rounded-full text-sm font-medium ${
                sellerStatus.status === "approved"
                  ? "bg-emerald-100 text-emerald-700"
                  : sellerStatus.status === "pending"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-red-100 text-red-700"
              }`}
            >
              {sellerStatus.status === "approved"
                ? "✅ Loja Ativa"
                : sellerStatus.status === "pending"
                  ? "⏳ Em análise"
                  : "❌ Reprovado"}
            </div>
          </div>

          {sellerStatus.status === "approved" && (
            <button
              onClick={() => onBack && onBack("storeDashboard")}
              className="w-full bg-amber-400 text-white font-bold py-4 rounded-xl text-lg hover:bg-amber-500 transition-colors"
            >
              Gerenciar Minha Loja
            </button>
          )}

          {sellerStatus.status === "pending" && (
            <div className="bg-amber-50 rounded-xl p-4 text-center">
              <p className="text-amber-700 text-sm">
                Sua solicitação está em análise. Em até 48 horas você receberá
                uma resposta.
              </p>
            </div>
          )}
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
          <h1 className="text-xl font-bold text-white">
            {step === 1 ? "Tornar-se Vendedora" : "Dados da Loja"}
          </h1>
        </div>
      </div>

      <div className="p-4">
        {step === 1 && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="text-center mb-6">
                <div className="text-5xl mb-3">💰</div>
                <h2 className="text-xl font-bold text-gray-800">
                  Ganhe dinheiro vendendo
                </h2>
                <p className="text-gray-500 text-sm mt-2">
                  Transforme seus itens de bebe usados em renda extra. Milhares
                  de mamães compram e vendem todos os dias!
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <span className="text-2xl">📸</span>
                  <div>
                    <p className="font-medium text-gray-800">Publique fotos</p>
                    <p className="text-xs text-gray-500">
                      De itens que seu bebe nao usa mais
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <span className="text-2xl">💬</span>
                  <div>
                    <p className="font-medium text-gray-800">Converse direto</p>
                    <p className="text-xs text-gray-500">
                      Com as compradores pelo chat
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <span className="text-2xl">📦</span>
                  <div>
                    <p className="font-medium text-gray-800">
                      Entregue via correio
                    </p>
                    <p className="text-xs text-gray-500">
                      {" "}
                      我们 nao cobramos taxa de anuncio
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full bg-amber-400 text-white font-bold py-4 rounded-xl text-lg hover:bg-amber-500 transition-colors"
            >
              Quero ser vendedora
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-800 mb-4">
                Dados da Loja
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome da Loja
                  </label>
                  <input
                    type="text"
                    value={formData.storeName}
                    onChange={handleChange("storeName")}
                    placeholder="Ex: Lojinha da Maria"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descricao (opcional)
                  </label>
                  <textarea
                    value={formData.storeDescription}
                    onChange={handleChange("storeDescription")}
                    placeholder="Fale sobre sua loja..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CPF
                  </label>
                  <input
                    type="text"
                    value={formData.cpf}
                    onChange={handleChange("cpf")}
                    placeholder="000.000.000-00"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none"
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl">
                {error}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 bg-gray-100 text-gray-700 font-bold py-4 rounded-xl hover:bg-gray-200 transition-colors"
              >
                Voltar
              </button>
              <button
                onClick={handleApply}
                disabled={loading}
                className="flex-1 bg-amber-400 text-white font-bold py-4 rounded-xl disabled:opacity-50 hover:bg-amber-500 transition-colors"
              >
                {loading ? "Enviando..." : "Enviar Solicitacao"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
