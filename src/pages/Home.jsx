import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  Zap, 
  Star,
  ChevronRight
} from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';
import apiClient from '../services/apiClient';
import './Home.css';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await apiClient.get('/products?limit=8');
        // Backend: { success, data: { products: [...], pagination: {} } }
        const payload = response.data?.data || response.data;
        const data = payload?.products || (Array.isArray(payload) ? payload : []);
        setFeaturedProducts(data);
      } catch (error) {
        console.error('Failed to fetch featured products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const categories = [
    { name: 'Dark Chocolate',  icon: '🍫', color: '#92400e' },
    { name: 'Milk Chocolate',  icon: '🍬', color: '#b45309' },
    { name: 'White Chocolate', icon: '🍦', color: '#d97706' },
    { name: 'Gift Boxes',      icon: '🎁', color: '#059669' },
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-container">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-content"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="hero-badge"
            >
              <Zap size={14} /> New Season Arrival
            </motion.div>
            <h1>Pure Chocolate <span>Indulgence</span></h1>
            <p>Discover our handcrafted collection of premium chocolates — artisanally made and delivered fresh to your door.</p>
            
            <div className="hero-actions">
              <Link to="/products" className="btn btn-accent hero-btn">
                Shop Collection <ArrowRight size={20} />
              </Link>
              <div className="hero-stats">
                <div className="stat-item">
                  <strong>50k+</strong>
                  <span>Active Users</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <strong>4.9/5</strong>
                   <span className="flex-center gap-1"><Star size={12} fill="currentColor"/> Rating</span>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="hero-visual">
            <motion.div 
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 2, 0]
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
              className="main-blob"
            >
              <img src="/hero-chocolate.png" alt="Premium Chocolates" />
            </motion.div>
            
            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
              className="float-card glass card-1"
            >
              <div className="float-icon"><ShieldCheck size={20} /></div>
              <span>Verified Seller</span>
            </motion.div>

            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              className="float-card glass card-2"
            >
              <div className="float-icon"><Star size={20} className="text-warning" /></div>
              <span>Best Quality</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Strip */}
      <section className="categories-strip">
        <div className="container">
          <div className="categories-grid">
            {categories.map((cat, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="category-card glass-dark"
              >
                <Link to={`/products?category=${cat.name}`} className="category-link">
                  <div className="category-icon" style={{ backgroundColor: `${cat.color}20`, color: cat.color }}>
                    <span style={{ fontSize: '2rem' }}>{cat.icon}</span>
                  </div>
                  <h3>{cat.name}</h3>
                  <ChevronRight size={18} className="cat-arrow" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-section section-padding">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Trending Now</h2>
              <p className="section-subtitle">Our most popular products this week</p>
            </div>
            <Link to="/products" className="view-all">View All <ArrowRight size={18} /></Link>
          </div>

          <div className="products-grid">
            {loading ? (
              [1, 2, 3, 4].map(i => <div key={i} className="skeleton-card glass animate-pulse"></div>)
            ) : (
              featuredProducts.map((p, i) => (
                <motion.div
                  key={p._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ProductCard product={p} />
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="trust-section section-padding container">
        <div className="trust-grid glass">
          <div className="trust-item">
            <div className="trust-icon"><Truck /></div>
            <h3>Free Express Shipping</h3>
            <p>On all orders over ₹999. Fast and reliable delivery.</p>
          </div>
          <div className="trust-item">
            <div className="trust-icon"><ShieldCheck /></div>
            <h3>Secure Payments</h3>
            <p>256-bit SSL encryption for 100% secure checkouts.</p>
          </div>
          <div className="trust-item">
            <div className="trust-icon"><Zap /></div>
            <h3>Instant Support</h3>
            <p>Get your questions answered 24/7 by our expert team.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

