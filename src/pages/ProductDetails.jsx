import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Loader2, ArrowLeft, Star, Heart, Check, Truck, Shield } from 'lucide-react';
import apiClient from '../services/apiClient';
import { useCart } from '../context/CartContext';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // GET /api/products/:id
        const res = await apiClient.get(`/products/${id}`);
        const data = res.data.product || res.data;
        setProduct(data);
      } catch (err) {
        console.warn("API product fetch failed, trying dummy products fallback...", err);
        // Fallback to dummy data mapping if ID is a dummy one (d1, d2, etc.)
        import('./Products').then(module => {
          const dummyHit = module.DUMMY_PRODUCTS?.find(p => p._id === id);
          if (dummyHit) {
             setProduct(dummyHit);
          } else {
             setError("Unable to locate this product.");
          }
        }).catch(() => setError("Unable to locate this product."));
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="pd-loader container">
        <Loader2 className="spinner" size={64} />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="pd-error container">
        <h2>{error || "Product not found"}</h2>
        <Link to="/products" className="btn btn-outline">Back to Shop</Link>
      </div>
    );
  }

  // Graceful fallback for image arrays
  const images = (product.images && product.images.length > 0) 
    ? product.images 
    : [product.image || 'https://via.placeholder.com/600?text=No+Image'];

  const inStock = product.stock > 0 || product.inStock;

  return (
    <div className="product-details-page container">
      <Link to="/products" className="back-link">
        <ArrowLeft size={18} />
        Back to Products
      </Link>

      <div className="pd-grid">
        
        {/* Left: Image Gallery */}
        <div className="pd-gallery">
          <div className="pd-main-image-container">
            <img src={images[activeImage]} alt={product.name} className="pd-main-image" />
          </div>
          {images.length > 1 && (
            <div className="pd-thumbnails">
              {images.map((img, idx) => (
                <div 
                  key={idx} 
                  className={`pd-thumb ${activeImage === idx ? 'active' : ''}`}
                  onClick={() => setActiveImage(idx)}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Info & Actions */}
        <div className="pd-info">
          
          <div className="pd-header">
            <span className="pd-category">{product.category}</span>
            <h1 className="pd-title">{product.name}</h1>
            
            <div className="pd-meta">
              <div className="stars">
                {[1,2,3,4,5].map(star => (
                   <Star key={star} size={16} className={star <= (product.rating || 5) ? 'star-filled' : 'star-empty'} />
                ))}
              </div>
              <span className="pd-reviews">({product.reviews || Math.floor(Math.random()*100)+10} Reviews)</span>
              {product.brand && <span className="pd-brand">Brand: <strong>{product.brand}</strong></span>}
            </div>
          </div>

          <div className="pd-price-row">
            <span className="pd-price">${Number(product.price).toFixed(2)}</span>
            {product.originalPrice && <span className="pd-old-price">${Number(product.originalPrice).toFixed(2)}</span>}
          </div>

          <p className="pd-description">
            {product.description || "No description provided for this premium item."}
          </p>

          <div className="pd-stock-status">
            {inStock ? (
              <span className="stock in-stock"><Check size={18} /> In Stock ({product.stock || '10+'} available)</span>
            ) : (
              <span className="stock out-of-stock">Out of Stock</span>
            )}
          </div>

          <div className="pd-actions">
            <button 
              className="btn btn-primary btn-add-cart" 
              disabled={!inStock}
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
            <button className="btn btn-outline btn-wishlist">
              <Heart size={20} />
            </button>
          </div>

          <div className="pd-perks">
            <div className="perk">
              <Truck size={20} className="perk-icon" />
              <div>
                <strong>Free Delivery</strong>
                <p>On orders over $50</p>
              </div>
            </div>
            <div className="perk">
              <Shield size={20} className="perk-icon" />
              <div>
                <strong>1 Year Warranty</strong>
                <p>Guaranteed reliability</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
