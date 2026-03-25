import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader2, Filter } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';
import apiClient from '../services/apiClient';
import './Products.css';

export const DUMMY_PRODUCTS = [
  { _id: 'd1', name: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones', description: 'Industry leading noise cancellation headphones with superior sound quality and up to 30 hours of battery life.', price: 348.00, originalPrice: 398.00, rating: 5, reviews: 124, category: 'Electronics', images: ['https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=800&q=80'], isNew: true, discount: 12, stock: 15 },
  { _id: 'd2', name: 'Minimalist Premium Watch', description: 'A sleek, minimalist timepiece perfect for formal and casual occasions.', price: 199.99, rating: 4, reviews: 56, category: 'Accessories', images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'], stock: 5 },
  { _id: 'd3', name: 'Apple iPhone 14 Pro Max', description: 'The ultimate smartphone featuring a Pro camera system and powerful A16 Bionic chip.', price: 1099.00, rating: 5, reviews: 320, category: 'Electronics', images: ['https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=800&q=80'], isNew: true, stock: 45 },
  { _id: 'd4', name: 'Leather Messenger Bag', description: 'Handcrafted premium leather messenger bag suitable for daily commute.', price: 89.00, originalPrice: 120.00, rating: 4, reviews: 42, category: 'Fashion', images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80'], discount: 25, stock: 8 },
  { _id: 'd5', name: 'Nike Air Max 270', description: 'Legendary Air Max silhouette upgraded for modern streetwear.', price: 160.00, rating: 4, reviews: 89, category: 'Footwear', images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'], stock: 22 },
  { _id: 'd6', name: 'Smart Home Speaker System', description: 'Immersive sound and smart assistant capabilities for your entire home.', price: 129.99, rating: 5, reviews: 210, category: 'Electronics', images: ['https://images.unsplash.com/photo-1589003071515-4c84c4f3460e?auto=format&fit=crop&w=800&q=80'], stock: 19 },
  { _id: 'd7', name: 'Polarized Sunglasses', description: 'Stylish frame with advanced UV polarized lenses for ultimate eye protection.', price: 45.00, originalPrice: 65.00, rating: 4, reviews: 38, category: 'Accessories', images: ['https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80'], discount: 30, stock: 12 },
  { _id: 'd8', name: 'Professional Studio Microphone', description: 'Broadcast-quality condenser microphone ideal for podcasting and vocal recordings.', price: 249.00, rating: 5, reviews: 112, category: 'Electronics', images: ['https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80'], isNew: true, stock: 6 }
];

const Products = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const searchQuery = searchParams.get('search') || '';

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filters
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [sortOption, setSortOption] = useState('newest');

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setActiveCategory(cat);
  }, [searchParams]);

  useEffect(() => {
    const fetchShopData = async () => {
      try {
        setLoading(true);
        // Fetch products and categories concurrently
        const [productsRes, categoriesRes] = await Promise.all([
          apiClient.get('/products'),
          apiClient.get('/categories')
        ]);
        
        const productsData = Array.isArray(productsRes.data) ? productsRes.data : (productsRes.data.products || []);
        
        // Sometimes backend returns an object with results, parsing safely
        let catsData = [];
        if (categoriesRes.data && Array.isArray(categoriesRes.data)) {
          catsData = categoriesRes.data;
        } else if (categoriesRes.data && categoriesRes.data.categories) {
          catsData = categoriesRes.data.categories;
        }

        setProducts(productsData);
        setCategories(catsData);
      } catch (err) {
        console.error("Failed to fetch shop metadata:", err);
        setError("Unable to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchShopData();
  }, []);

  // Fallback if Mongo is absolutely empty
  const activeProducts = products.length > 0 ? products : DUMMY_PRODUCTS;

  // Filter and Sort Logic
  const filteredProducts = activeProducts.filter(p => {
    // 1. Category Filter
    if (activeCategory !== 'All') {
      const pCat = typeof p.category === 'object' ? p.category?.name : p.category;
      if (pCat !== activeCategory) return false;
    }
    // 2. Search Query Filter
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
    // Default newest (assumes _id roughly correlates with time if no timestamp)
    return -1;
  });

  return (
    <div className="shop-page container">
      
      <div className="shop-header">
        <h1 className="shop-title">Shop All Products</h1>
        <div className="shop-sort">
          <select 
            value={sortOption} 
            onChange={(e) => setSortOption(e.target.value)}
            className="sort-select"
          >
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="shop-layout">
        {/* Sidebar Filters */}
        <aside className="shop-sidebar">
          <div className="sidebar-widget">
            <h3 className="widget-title">
              <Filter size={18} />
              Categories
            </h3>
            <ul className="category-list">
              <li 
                className={activeCategory === 'All' ? 'active' : ''}
                onClick={() => setActiveCategory('All')}
              >
                All Products
              </li>
              {categories.map(cat => (
                <li 
                  key={cat._id}
                  className={activeCategory === cat.name ? 'active' : ''}
                  onClick={() => setActiveCategory(cat.name)}
                >
                  {cat.name}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="shop-main">
          {loading ? (
             <div className="loader-container">
               <Loader2 className="spinner" size={48} />
             </div>
          ) : filteredProducts.length === 0 ? (
            <div className="empty-container">
              No products found for this search.
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map(product => (
                <div key={product._id} className="card-wrapper">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
};

export default Products;
