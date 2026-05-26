import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Star, 
  Heart, 
  Check, 
  Truck, 
  ShieldCheck, 
  Loader2, 
  Minus, 
  Plus, 
  ShoppingCart,
  Share2
} from 'lucide-react';
import apiClient from '../services/apiClient';
import { useCart } from '../context/CartContext';
import { toast } from 'react-hot-toast';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await apiClient.get(`/products/${id}`);
        // Backend: { success, data: { product: {...} } }
        setProduct(res.data?.data?.product || res.data?.product || res.data);
      } catch (err) {
        console.error("Fetch failed", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${product.name} added to cart`, {
      icon: '🛍️',
      style: { background: '#0f172a', color: '#fff' }
    });
  };

  if (loading) {
    return (
      <div className="pd-loader flex-center section-padding">
        <Loader2 className="spinner" size={64} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pd-error container section-padding flex-center flex-column">
        <h2>Product not found</h2>
        <Link to="/products" className="btn btn-primary mt-4">Back to Shop</Link>
      </div>
    );
  }

  const images = (product.images && product.images.length > 0) 
    ? product.images 
    : [product.image || 'https://via.placeholder.com/600?text=No+Image'];

  return (
    <div className="product-details-page section-padding">
      <div className="container">
        <Link to="/products" className="back-link">
          <ArrowLeft size={18} /> Back to Products
        </Link>

        <div className="pd-grid">
          {/* Left: Gallery */}
          <div className="pd-gallery">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="pd-main-image-wrapper glass"
            >
              <AnimatePresence mode="wait">
                <motion.img 
                  key={activeImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  src={images[activeImage]} 
                  alt={product.name} 
                  className="pd-main-image" 
                />
              </AnimatePresence>
            </motion.div>
            
            <div className="pd-thumbnails">
              {images.map((img, idx) => (
                <motion.div 
                  key={idx} 
                  whileHover={{ y: -5 }}
                  className={`pd-thumb glass ${activeImage === idx ? 'active' : ''}`}
                  onClick={() => setActiveImage(idx)}
                >
                  <img src={img} alt={`Thumb ${idx}`} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="pd-info"
          >
            <div className="pd-header">
              <div className="pd-tag-row">
                <span className="pd-category-tag">{product.category}</span>
                {product.isNew && <span className="pd-new-tag">New Season</span>}
                {product.weight && <span className="pd-weight-tag">{product.weight}</span>}
              </div>
              <h1 className="pd-title">{product.name}</h1>
              <div className="pd-rating-row">
                <div className="pd-stars">
                  <Star size={16} fill="var(--warning)" color="var(--warning)" />
                  <span>{product.rating || '4.9'}</span>
                </div>
                <span className="pd-review-count">({product.numReviews || 86} customer reviews)</span>
              </div>
            </div>

            <div className="pd-price-row">
              <span className="pd-current-price">₹{Number(product.price).toLocaleString('en-IN')}</span>
              {product.actualPrice > 0 && (
                <span className="pd-old-price">₹{Number(product.actualPrice).toLocaleString('en-IN')}</span>
              )}
              {product.discountPercent > 0 && (
                <span className="pd-discount-badge">{product.discountPercent}% OFF</span>
              )}
            </div>

            <p className="pd-description">{product.description || "Indulge in pure excellence with this masterfully crafted piece, designed for those who value both aesthetic brilliance and functional superiority."}</p>

            {/* Chocolate Specifics */}
            <div className="pd-chocolate-specs glass">
              {product.brand && (
                <div className="spec-item">
                  <span className="spec-label">Brand:</span>
                  <span className="spec-value">{product.brand}</span>
                </div>
              )}
              {product.ingredients?.length > 0 && (
                <div className="spec-item">
                  <span className="spec-label">Ingredients:</span>
                  <span className="spec-value">{product.ingredients.join(', ')}</span>
                </div>
              )}
              {product.nutrition && (
                <div className="spec-item">
                  <span className="spec-label">Nutrition:</span>
                  <span className="spec-value">{product.nutrition}</span>
                </div>
              )}
              {product.allergenWarning && (
                <div className="spec-item warning">
                  <span className="spec-label">Allergen Warning:</span>
                  <span className="spec-value">{product.allergenWarning}</span>
                </div>
              )}
            </div>

            <div className="pd-purchase-section">

              <div className="pd-quantity-row">
                <span className="label">Quantity</span>
                <div className="qty-picker glass">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={18} /></button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)}><Plus size={18} /></button>
                </div>
              </div>

              <div className="pd-main-actions">
                <button 
                  className="btn btn-accent btn-add-cart" 
                  onClick={handleAddToCart}
                >
                  <ShoppingCart size={20} /> Add to Cart
                </button>
                <button className="btn btn-outline btn-icon-only">
                  <Heart size={20} />
                </button>
                <button className="btn btn-outline btn-icon-only">
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            <div className="pd-benefits-grid">
              <div className="pd-benefit-card glass">
                <Truck size={24} className="benefit-icon" />
                <div>
                  <h4>Free Shipping</h4>
                  <p>Express 3-day delivery</p>
                </div>
              </div>
              <div className="pd-benefit-card glass">
                <ShieldCheck size={24} className="benefit-icon" />
                <div>
                  <h4>Genuine Product</h4>
                  <p>100% authentic guarantee</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

