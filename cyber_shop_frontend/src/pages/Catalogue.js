import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProduits, getCategories, API_BASE_URL } from "../api";
import useDebounce from "../hooks/useDebounce";

function Catalogue() {
  const [produits, setProduits] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // états pour les filtres
  const [categorie, setCategorie] = useState("");
  const [niveauPrix, setNiveauPrix] = useState("");
  const [searchInput, setSearchInput] = useState(""); // nouvel état pour l'input
  const [ordering, setOrdering] = useState("");

  // Debounce la valeur de recherche
  const debouncedSearch = useDebounce(searchInput, 500);

  const fetchProduits = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (debouncedSearch) params.search = debouncedSearch;
      if (categorie) params["categorie__nom"] = categorie;
      if (niveauPrix) params.niveau_prix = niveauPrix;
      if (ordering) params.ordering = ordering;
      const data = await getProduits(params);
      setProduits(data);
    } catch (err) {
      console.error(err);
      setError("Impossible de récupérer les produits.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const cats = await getCategories();
        if (mounted) setCategories(cats);
      } catch (err) {
        console.warn("Erreur récupération catégories", err);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // Effet déclenché lorsque les filtres changent
  useEffect(() => {
    fetchProduits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categorie, niveauPrix, debouncedSearch, ordering]);

  return (
    <div style={{ padding: "30px", maxWidth: 1100, margin: "0 auto" }}>
      <h2>Catalogue</h2>

      {/* Contrôles de filtrage */}
      <div
        style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}
      >
        <input
          placeholder="Rechercher..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          style={{ padding: 8, minWidth: 220 }}
        />

        <select
          value={categorie}
          onChange={(e) => setCategorie(e.target.value)}
          style={{ padding: 8 }}
        >
          <option value="">Toutes catégories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.nom}>
              {c.nom}
            </option>
          ))}
        </select>

        <select
          value={niveauPrix}
          onChange={(e) => setNiveauPrix(e.target.value)}
          style={{ padding: 8 }}
        >
          <option value="">Tous niveaux prix</option>
          <option value="low">Bas (&lt;50)</option>
          <option value="medium">Moyen (50-200)</option>
          <option value="high">Élevé (&gt;200)</option>
        </select>

        <select
          value={ordering}
          onChange={(e) => setOrdering(e.target.value)}
          style={{ padding: 8 }}
        >
          <option value="">Tri par défaut</option>
          <option value="prix">Prix croissant</option>
          <option value="-prix">Prix décroissant</option>
          <option value="date_ajout">Plus récents</option>
        </select>

        <button
          onClick={() => {
            setSearchInput("");
            setCategorie("");
            setNiveauPrix("");
            setOrdering("");
          }}
          style={{ padding: 8 }}
        >
          Réinitialiser
        </button>
      </div>

      {/* Indicateur de chargement */}
      {loading && (
        <div style={{ textAlign: "center", padding: "20px" }}>
          Chargement...
        </div>
      )}

      {/* Message d'erreur */}
      {error && (
        <div style={{ color: "tomato", textAlign: "center", padding: "20px" }}>
          {error}
        </div>
      )}

      {/* Grille de produits */}
      {!loading && !error && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))",
            gap: 20,
          }}
        >
          {produits.map((p) => {
            const imgSrc =
              p.image_url ||
              (p.image &&
                (p.image.startsWith("http")
                  ? p.image
                  : `${API_BASE_URL.replace(/\/api$/, "")}${p.image}`)) ||
              null;
            return (
              <article
                key={p.id}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  padding: 15,
                  borderRadius: 8,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {imgSrc && (
                  <div
                    style={{
                      width: "100%",
                      height: 140,
                      overflow: "hidden",
                      borderRadius: 4,
                    }}
                  >
                    <img
                      src={imgSrc}
                      alt={p.nom || p.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </div>
                )}
                <h3 style={{ marginTop: 10 }}>{p.nom || p.title}</h3>
                <p style={{ minHeight: 40 }}>
                  {p.description
                    ? p.description.substring(0, 120) +
                      (p.description.length > 120 ? "…" : "")
                    : ""}
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "auto",
                  }}
                >
                  <Link
                    to={`/produit/${p.id}`}
                    style={{
                      padding: "8px 12px",
                      border: "1px solid var(--color-primary-neon)",
                      color: "var(--color-primary-neon)",
                      borderRadius: 6,
                    }}
                  >
                    Voir
                  </Link>
                  <strong>{p.prix ? `${p.prix} €` : ""}</strong>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Catalogue;
