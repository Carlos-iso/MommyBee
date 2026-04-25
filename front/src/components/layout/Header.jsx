export default function Header({
  cartCount,
  notifCount,
  onCartClick,
  onNotifClick,
  onLoginClick,
  onProfileClick,
  isLoggedIn,
}) {
  return (
    <header className="sticky top-0 z-50 bg-amber-400 px-4 pt-4 pb-3 shadow-md w-full mx-auto">
      <div className="flex items-center gap-3 md:max-w-6xl md:mx-auto">
        <div className="flex items-center gap-1 shrink-0 cursor-pointer">
          <span className="text-2xl md:text-3xl">🐝</span>
          <span
            style={{ fontFamily: "'Fredoka One', cursive" }}
            className="text-white text-xl md:text-2xl font-bold leading-none"
          >
            MommyBee
          </span>
        </div>

        <div className="flex-1 relative md:max-w-md">
          <input
            type="text"
            placeholder="Buscar itens de bebê..."
            className="w-full rounded-full bg-white py-2 pl-4 pr-10 text-sm text-gray-600 placeholder-gray-400 outline-none shadow-sm focus:ring-2 focus:ring-amber-200 md:py-3 md:text-base"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-400">
            <svg
              className="w-4 h-4 md:w-5 md:h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <button onClick={onCartClick} className="relative text-white">
            <svg
              className="w-6 h-6 md:w-7 md:h-7"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <button onClick={onNotifClick} className="relative text-white">
            <svg
              className="w-6 h-6 md:w-7 md:h-7"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            {notifCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {notifCount}
              </span>
            )}
          </button>
          {isLoggedIn ? (
            <button onClick={() => onProfileClick?.()} className="text-white">
              <span className="text-xl">👤</span>
            </button>
          ) : (
            <button
              onClick={onLoginClick}
              className="text-white font-medium text-sm bg-white/20 px-3 py-1.5 rounded-full"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
