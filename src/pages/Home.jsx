import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';
import apiClient from '../services/apiClient';
import './Home.css';

const DUMMY_PRODUCTS = [
  { _id: 'd1', name: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones', price: 348.00, originalPrice: 398.00, rating: 5, reviews: 124, category: 'Electronics', images: ['https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=800&q=80'], isNew: true, discount: 12 },
  { _id: 'd2', name: 'Minimalist Premium Watch', price: 199.99, rating: 4, reviews: 56, category: 'Accessories', images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'] },
  { _id: 'd3', name: 'Apple iPhone 14 Pro Max', price: 1099.00, rating: 5, reviews: 320, category: 'Electronics', images: ['https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=800&q=80'], isNew: true },
  { _id: 'd4', name: 'Leather Messenger Bag', price: 89.00, originalPrice: 120.00, rating: 4, reviews: 42, category: 'Fashion', images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80'], discount: 25 },
  { _id: 'd5', name: 'Nike Air Max 270', price: 160.00, rating: 4, reviews: 89, category: 'Footwear', images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'] },
  { _id: 'd6', name: 'Smart Home Speaker System', price: 129.99, rating: 5, reviews: 210, category: 'Electronics', images: ['https://images.unsplash.com/photo-1589003071515-4c84c4f3460e?auto=format&fit=crop&w=800&q=80'] },
  { _id: 'd7', name: 'Polarized Sunglasses', price: 45.00, originalPrice: 65.00, rating: 4, reviews: 38, category: 'Accessories', images: ['https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80'], discount: 30 },
  { _id: 'd8', name: 'Professional Studio Microphone', price: 249.00, rating: 5, reviews: 112, category: 'Electronics', images: ['https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80'], isNew: true }
];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Fetch real data from the backend
        const res = await apiClient.get('/products');
        // Extract array & slice first 8 for the homepage 'Trending' section
        const data = Array.isArray(res.data) ? res.data : (res.data.products || []);
        setProducts(data.slice(0, 8));
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load trending products right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="home-page">
      
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-container">
          <div className="hero-content">
            <span className="hero-badge">New Collection 2026</span>
            <h1 className="hero-title">Discover Premium Products Delivered to You.</h1>
            <p className="hero-subtitle">
              ShopNova brings you the finest selection of electronics, fashion, and home goods with unparalleled quality and style.
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary btn-lg">Shop Now</button>
              <button className="btn btn-outline btn-lg">Explore Categories</button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Trending Now</h2>
            <a href="/products" className="view-all-link">View All Products &rarr;</a>
          </div>
          
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem', color: 'var(--clr-accent)' }}>
              <Loader2 className="spinner" size={48} />
            </div>
          ) : (
            <div className="products-grid">
              {(products.length > 0 ? products : DUMMY_PRODUCTS).map(product => (
                <ProductCard key={product._id || product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Benefit Banner */}
      <section className="benefits-section">
        <div className="container benefits-grid">
          <div className="benefit-card">
            <h3>Free Shipping</h3>
            <p>On all orders over $50</p>
          </div>
          <div className="benefit-card">
            <h3>24/7 Support</h3>
            <p>Ready to help anytime</p>
          </div>
          <div className="benefit-card">
            <h3>Secure Payment</h3>
            <p>100% protected transactions</p>
          </div>
          <div className="benefit-card">
            <h3>Easy Returns</h3>
            <p>30-day money back guarantee</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
