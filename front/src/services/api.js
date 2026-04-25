const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

class ApiService {
  constructor() {
    this.token = localStorage.getItem("token");
  }

  getHeaders() {
    const headers = {
      "Content-Type": "application/json",
    };
    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }
    return headers;
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem("token", token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem("token");
  }

  async register(data) {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || "Erro ao registrar");
    return json;
  }

  async login(email, password) {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || "Erro ao fazer login");
    if (json.access_token) {
      this.setToken(json.access_token);
    }
    return json;
  }

  async getProfile() {
    const res = await fetch(`${API_URL}/auth/me`, {
      headers: this.getHeaders(),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message);
    return json;
  }

  async updateProfile(data) {
    const res = await fetch(`${API_URL}/auth/me`, {
      method: "PUT",
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message);
    return json;
  }

  async applySeller(data) {
    const res = await fetch(`${API_URL}/sellers/apply`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || "Erro ao candidatar");
    return json;
  }

  async checkUsername(username) {
    const res = await fetch(`${API_URL}/mommy/check-username/${username}`);
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || "Erro ao verificar username");
    return json.available;
  }

  async getMySeller() {
    const res = await fetch(`${API_URL}/sellers/me`, {
      headers: this.getHeaders(),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message);
    return json;
  }

  logout() {
    this.clearToken();
    localStorage.removeItem("user");
  }
}

export const api = new ApiService();
