import axios from 'axios';

const BACKEND_BASE = 'http://127.0.0.1:8000';
export const API_BASE_URL = `${BACKEND_BASE}/api`;

/**
 * Récupère la liste des produits.
 * Accepte un objet `params` pour les filtres (ex: { search, 'categorie__nom', niveau_prix, ordering })
 * Retourne toujours un tableau (gère pagination DRF).
 */
export async function getProduits(params = {}) {
  const res = await axios.get(`${API_BASE_URL}/produits/`, { params });
  const data = res.data;
  return Array.isArray(data) ? data : (data.results || []);
}

/**
 * Récupère un produit par id.
 */
export async function getProduit(id) {
  const res = await axios.get(`${API_BASE_URL}/produits/${id}/`);
  return res.data;
}

/**
 * Récupère la liste des catégories.
 */
export async function getCategories() {
  const res = await axios.get(`${API_BASE_URL}/categories/`);
  const data = res.data;
  return Array.isArray(data) ? data : (data.results || []);
}

export default {
  BACKEND_BASE,
  API_BASE_URL,
  getProduits,
  getProduit,
  getCategories,
};