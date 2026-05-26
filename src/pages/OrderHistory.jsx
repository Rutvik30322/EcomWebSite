import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Clock, CheckCircle, ChevronRight, ShoppingBag, Loader2 } from 'lucide-react';
import apiClient from '../services/apiClient';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import './Orders.css';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Correct endpoint: /orders/my-orders (not /orders/myorders)
        const response = await apiClient.get('/orders/my-orders');
        // Backend: { success: true, data: { orders: [...] } }
        const payload = response.data?.data;
        setOrders(payload?.orders || payload || []);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered': return <CheckCircle size={18} className="status-delivered" />;
      case 'shipped':   return <Package size={18} className="status-shipped" />;
      case 'processing': return <Clock size={18} className="status-processing" />;
      case 'cancelled': return <Package size={18} className="status-cancelled" />;
      default: return <Clock size={18} className="status-pending" />;
    }
  };

  if (loading) {
    return (
      <div className="orders-loading flex-center section-padding">
        <Loader2 className="spinner" size={48} />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="orders-empty container section-padding flex-center flex-column">
        <div className="empty-icon glass">
          <ShoppingBag size={64} />
        </div>
        <h2>No orders yet</h2>
        <p>Your order history is empty. Start shopping to fill it up!</p>
        <Link to="/products" className="btn btn-primary">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="orders-page container section-padding">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="orders-header"
      >
        <h1>My Orders</h1>
        <p>Track and manage your recent purchases</p>
      </motion.div>

      <div className="orders-list">
        {orders.map((order, index) => (
          <motion.div 
            key={order._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="order-card glass hover-lift"
          >
            <div className="order-main-info">
              <div className="order-id-group">
                <span className="label">Order ID</span>
                <span className="value">#{order._id.slice(-8).toUpperCase()}</span>
              </div>
              <div className="order-date-group">
                <span className="label">Placed on</span>
                <span className="value">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
              </div>
              <div className="order-status-group">
                {/* Backend field: orderStatus (not status) */}
                <div className={`status-badge status-${(order.orderStatus || 'pending').toLowerCase()}`}>
                  {getStatusIcon(order.orderStatus)}
                  {order.orderStatus || 'Pending'}
                </div>
              </div>
              <div className="order-total-group">
                <span className="label">Total Amount</span>
                <span className="value">₹{order.totalPrice.toLocaleString('en-IN')}</span>
              </div>
              <ChevronRight className="chevron" />
            </div>

            <div className="order-preview-items">
              {order.orderItems.map((item, i) => (
                <div key={i} className="preview-item">
                  <img src={item.image} alt={item.name} title={item.name} />
                </div>
              ))}
              {order.orderItems.length > 4 && (
                <div className="more-items">+{order.orderItems.length - 4}</div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
