import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Catalogue from "./pages/Catalogue";
import ProductDetail from "./pages/ProductDetail";

function App() {
  // L'URL de base de l'API Django (utilisée dans ../api.js aussi)
  const API_BASE_URL = "http://127.0.0.1:8000/api";

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogue" element={<Catalogue />} />
        <Route path="/produit/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
