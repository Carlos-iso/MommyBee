import { useState, useEffect } from "react";
import { CART_ITEMS as INITIAL_ITEMS } from "../data/mockData";

export default function Cart({ onBack, onClose }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("cartItems");
    if (saved) {
      setItems(JSON.parse(saved));
    } else {
      setItems(INITIAL_ITEMS);
      localStorage.setItem("cartItems", JSON.stringify(INITIAL_ITEMS));
    }
  }, []);

  const updateQuantity = (id, delta) => {
    const updated = items.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    );
    setItems(updated);
    localStorage.setItem("cartItems", JSON.stringify(updated));
  };

  const removeItem = (id) => {
    const updated = items.filter((item) => item.id !== id);
    setItems(updated);
    localStorage.setItem("cartItems", JSON.stringify(updated));
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 49 ? 0 : 12.9;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100 px-4 py-4 sticky top-0 z-40">
        <div className="flex items-center justify-between md:max-w-2xl md:mx-auto">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="text-amber-500 hover:text-amber-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-xl font-bold text-gray-800">Carrinho de Compras</h1>
            <span className="bg-amber-400 text-white text-xs font-bold px-2 py-0.5 rounded-full">{items.length}</span>
          </div>
          {onClose && (
            <button onClick={onClose} className="text-gray-500 hover:text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="md:max-w-2xl md:mx-auto md:px-4 py-4">
        {items.length === 0 ? (
          <div className="text-center py-12">
            <span className="text-6xl">🛒</span>
            <p className="text-gray-500 mt-4 font-medium">Your cart is empty</p>
            <button onClick={onBack} className="mt-4 bg-amber-400 text-white px-6 py-2 rounded-full font-medium hover:bg-amber-500">
              Start Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-3 px-4 md:px-0">
              {items.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm">
                  <div className="flex gap-3">
                    <div className="w-20 h-20 bg-amber-50 rounded-xl flex items-center justify-center text-4xl shrink-0">
                      {item.img}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-gray-800 line-clamp-2">{item.title}</h3>
                        <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-rose-500">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{item.variant}</p>
                      <div className="flex items-center justify-between mt-2">
                        <p className="font-bold text-amber-500">R${item.price.toFixed(2)}</p>
                        <div className="flex items-center gap-2 bg-gray-100 rounded-full px-2 py-1">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-gray-600 hover:bg-amber-50 hover:text-amber-500"
                          >
                            -
                          </button>
                          <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-gray-600 hover:bg-amber-50 hover:text-amber-500"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-4 md:px-0 mt-6">
              <div className="bg-white rounded-2xl shadow-sm p-4 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({items.length} items)</span>
                  <span>R${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? "text-emerald-500" : ""}>
                    {shipping === 0 ? "FREE" : `R$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-emerald-600 bg-emerald-50 p-2 rounded-lg">
                    Add R${(49 - subtotal).toFixed(2)} more for FREE shipping! 🚚
                  </p>
                )}
                <div className="flex justify-between font-bold text-lg pt-3 border-t border-gray-100">
                  <span>Total</span>
                  <span className="text-amber-500">R${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="px-4 md:px-0 mt-4">
              <button
                onClick={() => {
                  alert("Order placed successfully! 🐝");
                  setItems([]);
                  localStorage.setItem("cartItems", JSON.stringify([]));
                }}
                className="w-full bg-amber-400 text-white font-bold py-4 rounded-2xl text-lg hover:bg-amber-500 transition-colors"
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
