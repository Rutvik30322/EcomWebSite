import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Cart.css';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, cartSubtotal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="cart-empty container flex-center flex-column section-padding">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="empty-icon-wrapper"
        >
          <ShoppingBag size={80} />
        </motion.div>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <Link to="/products" className="btn btn-primary">
          Start Shopping <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page container section-padding">
      <motion.h1 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="page-title"
      >
        Your Shopping Bag <span>({cart.length} items)</span>
      </motion.h1>

      <div className="cart-grid">
        <div className="cart-items">
          <AnimatePresence mode="popLayout">
            {cart.map((item) => (
              <motion.div 
                key={item._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="cart-item glass hover-lift"
              >
                <div className="item-image">
                  <img src={item.images?.[0] || item.image} alt={item.name} />
                </div>
                <div className="item-details">
                  <div className="item-header">
                    <h3>{item.name}</h3>
                    <p className="item-category">{item.category}</p>
                  </div>
                  <div className="item-price">
                    ₹{item.price.toLocaleString('en-IN')}
                  </div>
                </div>
                <div className="item-actions">
                  <div className="quantity-controls">
                    <button 
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      className="qty-btn"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="qty-value">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="qty-btn"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item._id)}
                    className="delete-btn"
                    title="Remove item"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="cart-summary glass"
        >
          <h2>Order Summary</h2>
          <div className="summary-details">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="summary-row">
              <span>Delivery</span>
              <span className="free">FREE</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
            </div>
          </div>
          <button 
            onClick={() => navigate('/checkout')}
            className="btn btn-accent btn-block checkout-btn"
          >
            Checkout Securely <ShoppingCart size={18} />
          </button>
          <div className="summary-footer">
            <p>Secure SSL Encryption & Encrypted Payments</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CartPage;
