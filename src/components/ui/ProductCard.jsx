import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  // Gracefully handle MongoDB schema mapping
  const productId = product._id || product.id;
  const productImage = product.images?.[0] || product.image || 'https://via.placeholder.com/400?text=No+Image';
  const productPrice = Number(product.price) || 0;
  
  return (
    <Link to={`/product/${productId}`} className="product-card">
      <div className="product-image-container">
        <img src={productImage} alt={product.name} className="product-image" />
        <div className="product-badges">
          {product.isNew && <span className="badge new-badge">New</span>}
          {product.discount > 0 && <span className="badge discount-badge">-{product.discount}%</span>}
        </div>
        <button 
          className="quick-add-btn"
          onClick={(e) => {
            e.preventDefault(); // Prevent navigating to details page
            addToCart(product);
          }}
        >
          <ShoppingBag size={20} />
        </button>
      </div>
      
      <div className="product-info">
        <div className="product-category">{product.category}</div>
        <h3 className="product-name">{product.name}</h3>
        
        <div className="product-rating">
          <div className="stars">
            {[1,2,3,4,5].map(star => (
              <Star 
                key={star} 
                size={14} 
                className={star <= (product.rating || 5) ? 'star-filled' : 'star-empty'} 
              />
            ))}
          </div>
          <span className="reviews-count">({product.reviews || Math.floor(Math.random() * 100) + 10})</span>
        </div>
        
        <div className="product-price-row">
          <div className="prices">
            <span className="current-price">${productPrice.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="old-price">${Number(product.originalPrice).toFixed(2)}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
