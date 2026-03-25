import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        
        {/* Brand Column */}
        <div className="footer-col brand-col">
          <div className="footer-logo">
            <img src="https://img.icons8.com/fluency/48/shopping-cart.png" alt="ShopNova" width="36" />
            <span className="brand-name white">ShopNova</span>
          </div>
          <p className="footer-desc">
            Your premium destination for the best products online. We deliver quality directly to your doorstep.
          </p>
          <div className="social-links">
            <a href="#" className="social-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="#" className="social-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
            </a>
            <a href="#" className="social-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Shop All</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Customer Support */}
        <div className="footer-col">
          <h4 className="footer-heading">Customer Help</h4>
          <ul className="footer-links">
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/shipping">Shipping & Returns</Link></li>
            <li><Link to="/track">Track Order</Link></li>
            <li><Link to="/terms">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-col contact-col">
          <h4 className="footer-heading">Contact Us</h4>
          <div className="contact-item">
            <MapPin size={18} className="contact-icon" />
            <span>123 Commerce Avenue, NY 10012</span>
          </div>
          <div className="contact-item">
            <Phone size={18} className="contact-icon" />
            <span>+1 (800) 123-4567</span>
          </div>
          <div className="contact-item">
            <Mail size={18} className="contact-icon" />
            <span>support@shopnova.com</span>
          </div>
        </div>

      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} ShopNova. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
