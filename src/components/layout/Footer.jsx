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
            <div className="brand-logo-wrapper" style={{ width: '32px', height: '32px', marginRight: '8px' }}>
              <img src="/logo.png" alt="ChocoLux Logo" />
            </div>
            <span className="brand-name white">ChocoLux</span>
          </div>
          <p className="footer-desc">
            Discover the art of fine chocolate. High-quality, handcrafted truffles and sweets delivered straight to your door with love.
          </p>
          <div className="social-links">
            <a href="#" className="social-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="#" className="social-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
            </a>
            <a href="#" className="social-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h4 className="footer-heading">Shop Collection</h4>
          <ul className="footer-links">
            <li><Link to="/products">All Chocolates</Link></li>
            <li><Link to="/products?category=Dark Chocolate">Dark Chocolate</Link></li>
            <li><Link to="/products?category=Milk Chocolate">Milk Chocolate</Link></li>
            <li><Link to="/products?category=Gift Boxes">Gift Boxes</Link></li>
          </ul>
        </div>

        {/* Customer Support */}
        <div className="footer-col">
          <h4 className="footer-heading">Support</h4>
          <ul className="footer-links">
            <li><Link to="/my-orders">Track Orders</Link></li>
            <li><Link to="/shipping">Shipping Policy</Link></li>
            <li><Link to="/faq">Frequent Questions</Link></li>
            <li><Link to="/terms">Privacy & Terms</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-col contact-col">
          <h4 className="footer-heading">Headoffice</h4>
          <div className="contact-item">
            <MapPin size={16} className="contact-icon" />
            <span>123 Truffle Street, Mumbai, MH 400001</span>
          </div>
          <div className="contact-item">
            <Phone size={16} className="contact-icon" />
            <span>+91 1800 123 CHOC</span>
          </div>
          <div className="contact-item">
            <Mail size={16} className="contact-icon" />
            <span>hello@chocolux.com</span>
          </div>
        </div>

      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} ChocoLux. Crafted with passion for fine chocolate.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
