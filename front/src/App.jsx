import { useState, useEffect } from "react";
import Header from "./components/layout/Header";
import BottomNav from "./components/layout/BottomNav";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Sell from "./pages/Sell";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Social from "./pages/Social";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BecomeSeller from "./pages/BecomeSeller";
import StoreDashboard from "./pages/StoreDashboard";

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [showCart, setShowCart] = useState(false);
  const [showAuth, setShowAuth] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (result) => {
    setUser(result.user || result);
    setShowAuth(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setActiveTab("home");
  };

  const renderPage = () => {
    switch (activeTab) {
      case "home":
        return <Home onNavigate={(tab) => setActiveTab(tab)} />;
      case "categories":
        return <Categories onBack={() => setActiveTab("home")} />;
      case "sell":
        return <Sell onBack={() => setActiveTab("home")} />;
      case "notifications":
        return <Notifications onBack={() => setActiveTab("home")} />;
      case "social":
        return <Social onBack={() => setActiveTab("home")} />;
      case "profile":
        return (
          <Profile
            onBack={() => setActiveTab("home")}
            onLogout={handleLogout}
            onBecomeSeller={() => setActiveTab("becomeSeller")}
          />
        );
      case "becomeSeller":
        return (
          <BecomeSeller
            onBack={() => setActiveTab("profile")}
            onSuccess={() => {}}
          />
        );
      case "storeDashboard":
        return <StoreDashboard onBack={() => setActiveTab("profile")} />;
      case "benefits":
        return <Social onBack={() => setActiveTab("social")} />;
      default:
        return <Home onNavigate={(tab) => setActiveTab(tab)} />;
    }
  };

  if (showAuth === "login") {
    return (
      <Login
        onBack={() => setShowAuth(null)}
        onLoginSuccess={handleLogin}
        onGoToRegister={() => setShowAuth("register")}
      />
    );
  }

  if (showAuth === "register") {
    return (
      <Register
        onBack={() => setShowAuth("login")}
        onRegisterSuccess={handleLogin}
      />
    );
  }

  if (showCart) {
    return (
      <Cart
        onBack={() => setActiveTab("home")}
        onClose={() => setShowCart(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 w-full mx-auto relative">
      <Header
        cartCount={3}
        notifCount={7}
        onCartClick={() => setShowCart(true)}
        onNotifClick={() => setActiveTab("notifications")}
        onLoginClick={() => setShowAuth("login")}
        onProfileClick={() => setActiveTab("profile")}
        isLoggedIn={!!user}
      />
      <section className="hidden md:block">
        <Header
          cartCount={3}
          notifCount={7}
          onCartClick={() => setShowCart(true)}
          onNotifClick={() => setActiveTab("notifications")}
          onLoginClick={() => setShowAuth("login")}
          onProfileClick={() => setActiveTab("profile")}
          isLoggedIn={!!user}
        />
      </section>
      <main className="overflow-y-auto pb-20 md:pb-8">{renderPage()}</main>
      <BottomNav active={activeTab} setActive={setActiveTab} />
    </div>
  );
}
