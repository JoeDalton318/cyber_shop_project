// src/pages/Home.js
import React from 'react';

function Home() {
  return (
    <div style={homeContainerStyle}>
      <h2 style={titleStyle}>
        Bienvenue dans le Réseau <span style={neonTextStyle}>NEON</span>
      </h2>
      <p style={descriptionStyle}>
        Votre source exclusive pour les technologies illicites, les augmentations chromées et les équipements de survie urbaine. Accès sécurisé. Paiement en crédits uniquement.
      </p>
      <a href="/catalogue" style={accessButtonStyle}>
        Accéder au Catalogue 
      </a>
    </div>
  );
}

// Styles Cyberpunk
const homeContainerStyle = {
  textAlign: 'center',
  padding: '50px',
  border: '1px dashed var(--color-accent-neon)',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  boxShadow: '0 0 20px rgba(160, 32, 240, 0.7)',
  margin: '50px auto',
  maxWidth: '800px',
};

const titleStyle = {
  fontSize: '3em',
  marginBottom: '20px',
  color: 'var(--color-primary-neon)',
};

const neonTextStyle = {
  color: 'var(--color-accent-neon)',
  textShadow: '0 0 10px var(--color-accent-neon), 0 0 20px rgba(160, 32, 240, 0.5)',
};

const descriptionStyle = {
  fontSize: '1.2em',
  color: 'var(--color-text-light)',
  marginBottom: '40px',
};

const accessButtonStyle = {
    // Les styles de base des liens sont dans index.css, ici on override légèrement
    borderColor: 'var(--color-primary-neon)',
    color: 'var(--color-primary-neon)',
    boxShadow: '0 0 10px var(--color-primary-neon)',
    fontWeight: 'bold',
    fontSize: '1.1em',
    padding: '10px 20px'
};

export default Home;