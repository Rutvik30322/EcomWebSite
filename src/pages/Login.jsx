import React, { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, Phone, Lock, Loader2, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import './Auth.css';

const Login = () => {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!/^[0-9]{10}$/.test(mobile)) {
      return toast.error('Please enter a valid 10-digit mobile number');
    }
    setLoading(true);
    
    const result = await login(mobile, password);
    
    if (result.success) {
      toast.success('Welcome back!');
      navigate(redirectTo);
    } else {
      toast.error(result.message);
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="auth-card glass"
      >
        <div className="auth-header">
          <div className="auth-icon-wrapper">
            <LogIn className="auth-icon" />
          </div>
          <h2>Log In</h2>
          <p>{redirectTo !== '/' ? 'Sign in to continue with your order' : 'Elevate your shopping experience'}</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-field">
            <Phone className="input-icon" size={20} />
            <input 
              type="tel" 
              placeholder="Mobile Number (10 digits)" 
              value={mobile}
              onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
              required
              maxLength={10}
              inputMode="numeric"
            />
          </div>

          <div className="input-field">
            <Lock className="input-icon" size={20} />
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? <Loader2 className="spinner" size={20} /> : (
              <>
                Sign In <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>Don't have an account? <Link to={`/signup${redirectTo !== '/' ? `?redirect=${encodeURIComponent(redirectTo)}` : ''}`}>Create one</Link></p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
