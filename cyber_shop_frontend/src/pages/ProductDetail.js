import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProduit } from "../api";

function ProductDetail() {
  const { id } = useParams();
  const [produit, setProduit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await getProduit(id);
        if (mounted) setProduit(data);
      } catch (err) {
        console.error(err);
        if (mounted) setError("Impossible de charger le produit.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading)
    return (
      <div style={{ padding: 40, textAlign: "center" }}>Chargement...</div>
    );
  if (error)
    return (
      <div style={{ padding: 40, textAlign: "center", color: "tomato" }}>
        {error}
      </div>
    );
  if (!produit) return null;

  const imgSrc = produit.image_url || null;

  return (
    <div style={{ padding: 30, maxWidth: 900, margin: "0 auto" }}>
      <Link
        to="/catalogue"
        style={{ display: "inline-block", marginBottom: 20 }}
      >
        ← Retour au catalogue
      </Link>
      <div style={{ display: "flex", gap: 20 }}>
        {imgSrc && (
          <img
            src={imgSrc}
            alt={produit.nom || produit.title}
            style={{
              width: 320,
              height: 320,
              objectFit: "cover",
              borderRadius: 8,
            }}
          />
        )}
        <div>
          <h2>{produit.nom || produit.title}</h2>
          <p
            style={{ color: "var(--color-secondary-neon)", fontSize: "1.1em" }}
          >
            {produit.prix ? `${produit.prix} €` : "Prix non renseigné"}
          </p>
          <p style={{ whiteSpace: "pre-wrap" }}>{produit.description}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
