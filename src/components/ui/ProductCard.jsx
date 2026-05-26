import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { toast } from 'react-hot-toast';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const productId = product._id || product.id;
  const productImage = product.image && product.image !== '🍫' 
    ? product.image 
    : (product.images?.[0] || 'https://via.placeholder.com/400?text=No+Image');
  const productPrice = Number(product.price) || 0;
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.name} added to cart!`, {
      icon: '🍫',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  return (
    <motion.div 
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className="product-card glass hover-lift"
    >
      <Link to={`/product/${productId}`}>
        <div className="product-image-container">
          {productImage === '🍫' ? (
            <div className="emoji-fallback flex-center" style={{ height: '100%', fontSize: '4rem' }}>🍫</div>
          ) : (
            <img src={productImage} alt={product.name} className="product-image" loading="lazy" />
          )}
          
          <div className="product-overlay">
            <button 
              className="overlay-btn quick-view" 
              title="Quick View"
              onClick={(e) => { e.preventDefault(); /* Navigate handled by Link */ }}
            >
              <Eye size={20} />
            </button>
            <button 
              className="overlay-btn add-to-cart" 
              onClick={handleAddToCart}
              title="Add to Cart"
            >
              <ShoppingCart size={20} />
            </button>
          </div>

          <div className="product-badges">
            {product.isNew && <span className="badge new-badge">New Arrival</span>}
            {product.discountPercent > 0 && <span className="badge discount-badge">-{product.discountPercent}%</span>}
          </div>
        </div>
        
        <div className="product-info">
          <p className="product-category">{product.category}</p>
          <h3 className="product-name">{product.name}</h3>
          
          <div className="product-footer">
            <div className="product-price-box">
              <span className="current-price">₹{productPrice.toLocaleString('en-IN')}</span>
              {product.actualPrice > 0 && (
                <span className="old-price">₹{Number(product.actualPrice).toLocaleString('en-IN')}</span>
              )}
            </div>
            
            <div className="product-rating">
              {product.weight && <span className="pd-weight-chip">{product.weight}</span>}
              <div className="flex-center gap-1">
                <Star size={14} className="star-icon" fill="currentColor" />
                <span>{product.rating || '4.5'}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};


export default ProductCard;

