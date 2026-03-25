import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        {/* The main layout wrapper ensuring Footer stays at bottom */}
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header />
          
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetails />} />
            </Routes>
          </main>
          
          <Footer />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
