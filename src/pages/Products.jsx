import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Filter, ChevronDown, LayoutGrid, List } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';
import apiClient from '../services/apiClient';
import './Products.css';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const searchQuery = searchParams.get('search') || '';

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [sortOption, setSortOption] = useState('newest');

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setActiveCategory(cat);
    else setActiveCategory('All');
  }, [searchParams]);

  useEffect(() => {
    const fetchShopData = async () => {
      try {
        setLoading(true);
        const [productsRes, categoriesRes] = await Promise.all([
          apiClient.get('/products'),
          apiClient.get('/categories')
        ]);

        // Backend wraps responses as: { success, data: { products: [...] } }
        const productsPayload = productsRes.data?.data || productsRes.data;
        const productsData = productsPayload?.products || (Array.isArray(productsPayload) ? productsPayload : []);

        const catsPayload = categoriesRes.data?.data || categoriesRes.data;
        const catsData = catsPayload?.categories || (Array.isArray(catsPayload) ? catsPayload : []);

        setProducts(productsData);
        setCategories(catsData);
      } catch (err) {
        console.error("Failed to fetch shop data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchShopData();
  }, []);

  const filteredProducts = products.filter(p => {
    if (activeCategory !== 'All') {
      const pCat = typeof p.category === 'object' ? p.category?.name : p.category;
      if (pCat !== activeCategory) return false;
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const nameMatch = p.name?.toLowerCase().includes(q);
      const descMatch = p.description?.toLowerCase().includes(q);
      if (!nameMatch && !descMatch) return false;
    }
    return true;
  }).sort((a, b) => {
    const priceA = Number(a.price) || 0;
    const priceB = Number(b.price) || 0;
    if (sortOption === 'price-low') return priceA - priceB;
    if (sortOption === 'price-high') return priceB - priceA;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <div className="shop-page section-padding">
      <div className="container">
        <div className="shop-header-premium">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="header-left"
          >
            <h1>Premium <span>Collection</span></h1>
            <p>Exploring {filteredProducts.length} curated items</p>
          </motion.div>

          <div className="header-right">
            <div className="sort-wrapper glass">
              <ChevronDown size={16} />
              <select 
                value={sortOption} 
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="newest">Latest Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        <div className="shop-layout">
          <aside className="shop-sidebar-premium">
            <div className="sidebar-section glass">
              <h3><Filter size={18} /> Categories</h3>
              <div className="category-chips">
                <button 
                  className={`chip ${activeCategory === 'All' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveCategory('All');
                    setSearchParams({});
                  }}
                >
                  All Products
                </button>
                {categories.map(cat => (
                  <button 
                    key={cat._id}
                    className={`chip ${activeCategory === cat.name ? 'active' : ''}`}
                    onClick={() => {
                      setActiveCategory(cat.name);
                      setSearchParams({ category: cat.name });
                    }}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <main className="shop-main-premium">
            <AnimatePresence mode="popLayout">
              {loading ? (
                <div className="loader-container flex-center">
                  <Loader2 className="spinner" size={48} />
                </div>
              ) : filteredProducts.length === 0 ? (
                <motion.div 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   className="no-results glass flex-center flex-column"
                >
                   <h2>No matches found</h2>
                   <p>Try adjusting your filters or search query.</p>
                </motion.div>
              ) : (
                <motion.div 
                  layout
                  className="products-grid-premium"
                >
                  {filteredProducts.map((p, i) => (
                    <motion.div
                      key={p._id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <ProductCard product={p} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Products;

