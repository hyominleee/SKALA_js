// src/services/api.js
const BASE_URL = "http://127.0.0.1:8000";

async function req(path, opts = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...opts,
  });
  if (!res.ok) {
    const msg = await res.text().catch(() => res.statusText);
    throw new Error(`${res.status} ${msg}`);
  }
  return res.json();
}

export const api = {
  getUser: (userId) => req(`/users/${encodeURIComponent(userId)}`),
  getProducts: () => req("/products"),
  getCart: (userId) => req(`/cart/${encodeURIComponent(userId)}`),
  addToCart: (payload) =>
    req(`/cart`, { method: "POST", body: JSON.stringify(payload) }),
};