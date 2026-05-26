import React, { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Lock, User, Phone, Loader2, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import './Auth.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/';

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'mobile') {
      setFormData({ ...formData, [name]: value.replace(/\D/g, '').slice(0, 10) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!/^[0-9]{10}$/.test(formData.mobile)) {
      return toast.error('Please enter a valid 10-digit mobile number');
    }
    if (formData.password !== formData.confirmPassword) {
      return toast.error('Passwords do not match');
    }

    setLoading(true);
    const result = await signup({
      name: formData.name,
      email: formData.email,
      mobile: formData.mobile,
      password: formData.password
    });
    
    if (result.success) {
      toast.success('Account created successfully!');
      navigate(redirectTo);
    } else {
      toast.error(result.message);
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="auth-card glass"
      >
        <div className="auth-header">
          <div className="auth-icon-wrapper">
            <UserPlus className="auth-icon" />
          </div>
          <h2>Sign Up</h2>
          <p>{redirectTo !== '/' ? 'Create an account to complete your order' : 'Join the future of ecommerce'}</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-field">
            <User className="input-icon" size={20} />
            <input 
              name="name"
              type="text" 
              placeholder="Full Name" 
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-field">
            <Mail className="input-icon" size={20} />
            <input 
              name="email"
              type="email" 
              placeholder="Email Address" 
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-field">
            <Phone className="input-icon" size={20} />
            <input 
              name="mobile"
              type="tel" 
              placeholder="Mobile Number (10 digits)" 
              value={formData.mobile}
              onChange={handleChange}
              required
              maxLength={10}
              inputMode="numeric"
            />
          </div>

          <div className="input-field">
            <Lock className="input-icon" size={20} />
            <input 
              name="password"
              type="password" 
              placeholder="Password" 
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-field">
            <Lock className="input-icon" size={20} />
            <input 
              name="confirmPassword"
              type="password" 
              placeholder="Confirm Password" 
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? <Loader2 className="spinner" size={20} /> : (
              <>
                Get Started <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have an account? <Link to={`/login${redirectTo !== '/' ? `?redirect=${encodeURIComponent(redirectTo)}` : ''}`}>Log In</Link></p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
