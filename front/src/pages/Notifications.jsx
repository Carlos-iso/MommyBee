import { useState, useEffect } from "react";
import { NOTIFICATIONS } from "../data/mockData";

export default function Notifications({ onBack }) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("notifications");
    if (saved) {
      setNotifications(JSON.parse(saved));
    } else {
      setNotifications(NOTIFICATIONS);
      localStorage.setItem("notifications", JSON.stringify(NOTIFICATIONS));
    }
  }, []);

  const markAsRead = (id) => {
    const updated = notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
    setNotifications(updated);
    localStorage.setItem("notifications", JSON.stringify(updated));
  };

  const markAllAsRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(updated);
    localStorage.setItem("notifications", JSON.stringify(updated));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getIcon = (type) => {
    switch (type) {
      case "order": return "🚚";
      case "price": return "📉";
      case "promo": return "🎟️";
      default: return "🔔";
    }
  };

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
            <h1 className="text-xl font-bold text-gray-800">Notificações</h1>
            {unreadCount > 0 && (
              <span className="bg-amber-400 text-white text-xs font-bold px-2 py-0.5 rounded-full">{unreadCount}</span>
            )}
          </div>
          {unreadCount > 0 && (
            <button onClick={markAllAsRead} className="text-sm text-amber-500 font-medium hover:text-amber-600">
              Mark all read
            </button>
          )}
        </div>
      </div>

      <div className="md:max-w-2xl md:mx-auto md:px-4 py-4">
        {notifications.length === 0 ? (
          <div className="text-center py-12">
            <span className="text-5xl">🔔</span>
            <p className="text-gray-500 mt-4">No notifications yet</p>
          </div>
        ) : (
          <div className="space-y-2 px-4 md:px-0">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => markAsRead(notif.id)}
                className={`bg-white rounded-2xl p-4 shadow-sm cursor-pointer transition-all hover:shadow-md ${
                  !notif.read ? "border-l-4 border-amber-400" : ""
                }`}
              >
                <div className="flex gap-3">
                  <div className="text-2xl">{getIcon(notif.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <h3 className={`font-bold ${!notif.read ? "text-gray-800" : "text-gray-600"}`}>
                        {notif.title}
                      </h3>
                      {!notif.read && <div className="w-2 h-2 rounded-full bg-amber-400 mt-2" />}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{notif.message}</p>
                    <p className="text-xs text-gray-400 mt-2">{notif.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
