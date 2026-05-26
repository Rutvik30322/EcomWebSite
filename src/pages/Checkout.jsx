import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, Truck, ShieldCheck, MapPin, Loader2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import apiClient from '../services/apiClient';
import { toast } from 'react-hot-toast';
import './Checkout.css';

const Checkout = () => {
  const { cart, cartSubtotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      toast('Please log in or create an account to place your order.', {
        icon: '🔒',
        duration: 5000,
      });
      navigate('/login?redirect=/checkout');
    }
  }, [isAuthenticated, navigate]);
  
  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    phone: ''
  });

  const handleInputChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    
    setLoading(true);
    try {
      const orderData = {
        orderItems: cart.map(item => ({
          name: item.name,
          quantity: item.quantity,
          // Prefer real URL image, skip emoji fallback for order
          image: (item.images?.[0] !== '🍫' ? item.images?.[0] : null) || (item.image !== '🍫' ? item.image : '') || '',
          price: item.price,
          product: item._id
        })),
        // Backend Order model field names: addressLine, city, state, pincode
        shippingAddress: {
          addressLine: shippingAddress.street,
          city: shippingAddress.city,
          state: shippingAddress.state,
          pincode: shippingAddress.zipCode,
        },
        // Backend enum: ['COD', 'Card', 'UPI', 'Razorpay']
        paymentMethod: 'COD',
        itemsPrice: cartSubtotal,
        shippingPrice: 0,
        taxPrice: Math.round(cartSubtotal * 0.18),
        totalPrice: Math.round(cartSubtotal * 1.18)
      };

      const response = await apiClient.post('/orders', orderData);
      
      // Backend: { success: true, data: { order: {...} } }
      if (response.data.success) {
        toast.success('🎉 Order placed successfully!');
        clearCart();
        const orderId = response.data?.data?.order?._id || response.data?.data?._id;
        navigate(`/order-success/${orderId}`);
      }
    } catch (error) {
      console.error('Order placement error:', error);
      toast.error(error.response?.data?.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    navigate('/products');
    return null;
  }

  return (
    <div className="checkout-page container section-padding">
      <div className="checkout-grid">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="checkout-main"
        >
          <div className="checkout-step glass">
            <div className="step-header">
              <MapPin className="step-icon" />
              <h2>Shipping Information</h2>
            </div>
            <form id="checkout-form" onSubmit={placeOrder} className="checkout-form">
              <div className="form-group full">
                <label>Street Address</label>
                <input 
                  type="text" name="street" value={shippingAddress.street} 
                  onChange={handleInputChange} required placeholder="123 Luxury Lane" 
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input 
                    type="text" name="city" value={shippingAddress.city} 
                    onChange={handleInputChange} required placeholder="Mumbai" 
                  />
                </div>
                <div className="form-group">
                  <label>State</label>
                  <input 
                    type="text" name="state" value={shippingAddress.state} 
                    onChange={handleInputChange} required placeholder="Maharashtra" 
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>ZIP/Postal Code</label>
                  <input 
                    type="text" name="zipCode" value={shippingAddress.zipCode} 
                    onChange={handleInputChange} required placeholder="400001" 
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input 
                    type="tel" name="phone" value={shippingAddress.phone} 
                    onChange={handleInputChange} required placeholder="+91 98765 43210" 
                  />
                </div>
              </div>
            </form>
          </div>

          <div className="checkout-step glass">
            <div className="step-header">
              <CreditCard className="step-icon" />
              <h2>Payment Method</h2>
            </div>
            <div className="payment-options">
              <div className="payment-option selected">
                <div className="option-info">
                  <Truck size={24} />
                  <div>
                    <p className="option-title">Cash on Delivery</p>
                    <p className="option-desc">Pay when you receive the product</p>
                  </div>
                </div>
                <div className="option-radio checked"></div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="checkout-sidebar"
        >
          <div className="order-summary-card glass">
            <h2>Order Details</h2>
            <div className="summary-items">
              {cart.map(item => (
                <div key={item._id} className="summary-item">
                  <div className="summary-item-left">
                    <img src={item.images?.[0] || item.image} alt={item.name} />
                    <span className="summary-qty">{item.quantity}</span>
                  </div>
                  <div className="summary-item-center">
                    <p className="item-name">{item.name}</p>
                  </div>
                  <div className="summary-item-right">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="summary-calc">
              <div className="calc-row">
                <span>Subtotal</span>
                <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="calc-row">
                <span>Shipping</span>
                <span className="free">FREE</span>
              </div>
              <div className="calc-row">
                <span>Estimated Tax (18% GST)</span>
                <span>₹{(cartSubtotal * 0.18).toLocaleString('en-IN')}</span>
              </div>
              <div className="calc-row total">
                <span>Order Total</span>
                <span>₹{(cartSubtotal * 1.18).toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button 
              type="submit" 
              form="checkout-form"
              className="btn btn-accent btn-block order-btn"
              disabled={loading}
            >
              {loading ? <Loader2 className="spinner" size={24} /> : (
                <>
                  Confirm Order <ArrowRight size={20} />
                </>
              )}
            </button>

            <div className="trust-badges">
              <div className="trust-badge">
                <ShieldCheck size={16} />
                <span>Secure Checkout</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;
