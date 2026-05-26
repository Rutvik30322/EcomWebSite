import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Package, ArrowRight, ShoppingBag } from 'lucide-react';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const { orderId } = useParams();

  return (
    <div className="confirmation-page container section-padding flex-center flex-column">
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="success-icon-wrapper"
      >
        <CheckCircle size={100} className="success-icon" />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="success-content"
      >
        <h1>Order Confirmed!</h1>
        <p className="order-id-display">Reference: <span>#{orderId?.slice(-8).toUpperCase()}</span></p>
        <div className="success-message glass">
          <p>Thank you for your purchase! We've received your order and are getting it ready for shipment. You'll receive an email confirmation shortly.</p>
        </div>

        <div className="success-actions">
          <Link to="/my-orders" className="btn btn-primary">
            <Package size={20} /> View Order History
          </Link>
          <Link to="/products" className="btn btn-outline">
            <ShoppingBag size={20} /> Continue Shopping
          </Link>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="success-decoration"
      >
        <div className="blob"></div>
        <div className="blob"></div>
      </motion.div>
    </div>
  );
};

export default OrderConfirmation;
