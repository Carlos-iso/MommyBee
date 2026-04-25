export const BANNERS = [
  { id: 1, bg: "from-amber-400 to-yellow-300", title: "Bem-vindo!", sub: "Até 50% de desconto no seu primeiro pedido", badge: "Novo Usuário", emoji: "🎁" },
  { id: 2, bg: "from-orange-300 to-amber-400", title: "Promoção Relâmpago!", sub: "Essenciais para bebê a partir de R$9,99", badge: "Hoje Só", emoji: "⚡" },
  { id: 3, bg: "from-yellow-300 to-lime-300", title: "Frete Grátis", sub: "Em todos os pedidos acima de R$49", badge: "Limitado", emoji: "🚚" },
];

export const QUICK_ACTIONS = [
  { id: 1, icon: "🚚", label: "Frete Grátis" },
  { id: 2, icon: "⚡", label: "Ofertas Diárias" },
  { id: 3, icon: "📦", label: "Vender Item", highlight: true },
  { id: 4, icon: "🗂️", label: "Categorias" },
  { id: 5, icon: "🎟️", label: "Cupons" },
  { id: 6, icon: "⭐", label: "Mais Vendidos" },
];

export const CATEGORIES = [
  { id: 1, icon: "👶", label: "Roupas", color: "bg-pink-100" },
  { id: 2, icon: "🧸", label: "Brinquedos", color: "bg-yellow-100" },
  { id: 3, icon: "🛒", label: "Carrinhos", color: "bg-blue-100" },
  { id: 4, icon: "🤱", label: "Maternidade", color: "bg-purple-100" },
  { id: 5, icon: "♻️", label: "Itens Usados", color: "bg-green-100" },
  { id: 6, icon: "🍼", label: "Alimentação", color: "bg-orange-100" },
  { id: 7, icon: "💊", label: "Saúde", color: "bg-red-100" },
  { id: 8, icon: "🎒", label: "Escola", color: "bg-indigo-100" },
];

export const NEW_USER_DEALS = [
  { id: 1, img: "👶", title: "Baby Onesie Set", price: 29.9, oldPrice: 59.9, discount: 50, tag: "Novo" },
  { id: 2, img: "🧸", title: "Plush Bear Toy", price: 14.9, oldPrice: 34.9, discount: 57, tag: "Promoção" },
  { id: 3, img: "🍼", title: "Anti-Colic Bottle", price: 19.9, oldPrice: 39.9, discount: 50, tag: "Novo" },
  { id: 4, img: "🛁", title: "Baby Bath Tub", price: 44.9, oldPrice: 89.9, discount: 50, tag: "Promoção" },
  { id: 5, img: "🎵", title: "Musical Mobile", price: 59.9, oldPrice: 99.9, discount: 40, tag: "Novo" },
];

export const POPULAR_NEAR = [
  { id: 1, img: "👗", title: "Vestido de Menina 2-3y", price: 25.9, location: "Mossoró, RN", sold: 128, tag: "Usado" },
  { id: 2, img: "🚗", title: "Carrinho de Brinquedo", price: 89.9, location: "Natal, RN", sold: 56, tag: "Novo" },
  { id: 3, img: "🎒", title: "Mochila Dino", price: 34.9, location: "Fortaleza, CE", sold: 201, tag: "Novo" },
  { id: 4, img: "🛏️", title: "Conjunto para Berço", price: 65.0, location: "Recife, PE", sold: 44, tag: "Usado" },
  { id: 5, img: "👟", title: "Tênis de Bebê", price: 39.9, location: "Mossoró, RN", sold: 87, tag: "Novo" },
  { id: 6, img: "🧩", title: "Quebra-Cabeça 48peças", price: 22.5, location: "Natal, RN", sold: 163, tag: "Promoção" },
];

export const RECOMMENDED = [
  { id: 1, img: "🍼", title: "Kit de Alimentação 6pc", price: 49.9, location: "Mossoró, RN", sold: 320, tag: "Novo" },
  { id: 2, img: "👶", title: "Macacão de Algodão", price: 18.9, location: "Natal, RN", sold: 510, tag: "Promoção" },
  { id: 3, img: "🧸", title: "Anéis de Empilhar Macios", price: 27.9, location: "Fortaleza, CE", sold: 89, tag: "Novo" },
  { id: 4, img: "🤱", title: "Travesseiro de Amamentação", price: 79.9, location: "Mossoró, RN", sold: 234, tag: "Usado" },
  { id: 5, img: "🎨", title: "Lápis de Cor laváveis", price: 12.9, location: "Recife, PE", sold: 445, tag: "Novo" },
  { id: 6, img: "🛒", title: "Carrinho leve", price: 349.0, location: "Natal, RN", sold: 67, tag: "Promoção" },
  { id: 7, img: "💤", title: "Saco de dormir 0-6m", price: 55.9, location: "Mossoró, RN", sold: 178, tag: "Novo" },
  { id: 8, img: "🎵", title: "Tapete de piano para bebê", price: 69.9, location: "Fortaleza, CE", sold: 92, tag: "Novo" },
];

export const TAG_STYLES = {
  Novo: "bg-emerald-100 text-emerald-700",
  Usado: "bg-sky-100 text-sky-700",
  Promoção: "bg-rose-100 text-rose-600",
};

export const CART_ITEMS = [
  { id: 1, img: "👶", title: "Baby Onesie Set", price: 29.9, quantity: 2, variant: "0-3m" },
  { id: 2, img: "🧸", title: "Plush Bear Toy", price: 14.9, quantity: 1, variant: "Standard" },
  { id: 3, img: "🍼", title: "Anti-Colic Bottle", price: 19.9, quantity: 3, variant: "180ml" },
];

export const NOTIFICATIONS = [
  { id: 1, type: "order", title: "Pedido Enviado! 🚚", message: "Seu pedido #12345 está a caminho", time: "2 horas atrás", read: false },
  { id: 2, type: "price", title: "Queda de Preço! 📉", message: "Carrinho de bebê agora com 30% de desconto", time: "5 horas atrás", read: false },
  { id: 3, type: "promo", title: "Novo Cupom Disponível 🎟️", message: "Você ganhou um cupom de R$20!", time: "1 dia atrás", read: true },
  { id: 4, type: "system", title: "Bem-vinda à MommyBee! 🐝", message: "Comece a comprar e vender itens para bebê", time: "2 dias atrás", read: true },
];

export const USER_PROFILE = {
  name: "Nome Usuário",
  email: "exemplo@email.com",
  avatar: "👩",
  location: "Cidade, Estado",
  joined: "Janeiro 2024",
  stats: {
    orders: 12,
    sales: 5,
    rating: 4.8,
  },
  coupons: [
    { code: "WELCOME20", discount: 20, expires: "2024-12-31", minValue: 50 },
    { code: "FREESHIP", discount: 0, expires: "2024-11-30", minValue: 49, type: "shipping" },
  ],
};

export const SELL_CATEGORIES = [
  { id: 1, icon: "👶", label: "Roupas", count: 234 },
  { id: 2, icon: "🧸", label: "Brinquedos", count: 156 },
  { id: 3, icon: "🛒", label: "Carrinhos", count: 45 },
  { id: 4, icon: "🤱", label: "Maternidade", count: 89 },
  { id: 5, icon: "🍼", label: "Alimentação", count: 112 },
  { id: 6, icon: "🛏️", label: "Móveis", count: 67 },
  { id: 7, icon: "📚", label: "Livros", count: 98 },
  { id: 8, icon: "👟", label: "Sapatos", count: 143 },
];

export const CHAT_MESSAGES = [
  { id: 1, sender: "seller", name: "Ana Paula", avatar: "👩", message: "Hi! Is this item still available?", time: "10:30" },
  { id: 2, sender: "me", message: "Yes, it is! Would you like more photos?", time: "10:32" },
  { id: 3, sender: "seller", name: "Ana Paula", avatar: "👩", message: "Perfect! Can you show the details?", time: "10:35" },
  { id: 4, sender: "me", message: "Of course! I'll send more photos in a moment.", time: "10:36" },
];

export const COUPONS = [
  { id: 1, code: "WELCOME20", discount: 20, type: "percent", minValue: 50, expires: "2024-12-31", description: "20% off for new users" },
  { id: 2, code: "SAVE10", discount: 10, type: "fixed", minValue: 100, expires: "2024-11-15", description: "R$10 off orders above R$100" },
  { id: 3, code: "FREESHIP", discount: 0, type: "shipping", minValue: 49, expires: "2024-11-30", description: "Free shipping on orders above R$49" },
];
