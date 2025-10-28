import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Catalogue from './pages/Catalogue';
import ProductDetail from './pages/ProductDetail';

function App() {
  // L'URL de base de l'API Django
  const API_BASE_URL = 'http://127.0.0.1:8000/api'; 

  return (
    <Router>
      <Header />
      <main style={{ padding: '20px' }}>
        <Routes>
          {/* Page d'accueil : présentation du site */}
          <Route path="/" element={<Home />} /> 
          
          {/* Catalogue/Recherche : liste des produits */}
          <Route path="/catalogue" element={<Catalogue apiBaseUrl={API_BASE_URL} />} /> 
          
          {/* Page produit : détails d'un produit spécifique */}
          <Route path="/produit/:productId" element={<ProductDetail apiBaseUrl={API_BASE_URL} />} /> 
          
          {/* Route 404 simple */}
          <Route path="*" element={<h1>404 | Système Hors Ligne</h1>} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;