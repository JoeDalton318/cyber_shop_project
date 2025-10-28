// src/components/Header.js
import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header style={headerStyle}>
      <h1 style={logoStyle}>NEON.SHOP</h1>
      <nav style={navStyle}>
        <Link to="/" style={linkStyle}>
          Accueil
        </Link>
        <Link to="/catalogue" style={linkStyle}>
          Catalogue
        </Link>
      </nav>
    </header>
  );
}

// Styles Cyberpunk
const headerStyle = {
  backgroundColor: "var(--color-dark)",
  padding: "20px 40px",
  borderBottom: "2px solid var(--color-primary-neon)",
  boxShadow: "0 0 10px var(--color-primary-neon)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const logoStyle = {
  fontSize: "2em",
  margin: 0,
  color: "var(--color-accent-neon)",
  textShadow: "0 0 15px var(--color-accent-neon)",
};

const navStyle = {
  display: "flex",
  gap: "20px",
};

const linkStyle = {
  // Les styles de base des liens sont dans index.css
  textTransform: "uppercase",
  fontWeight: "bold",
};

export default Header;
