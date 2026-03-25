import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import './Header.css';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { cartCount } = useCart();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="header">
      <div className="container header-container">
        
        {/* Brand */}
        <Link to="/" className="brand">
          <img src="https://img.icons8.com/fluency/48/shopping-cart.png" alt="ShopNova Logo" className="brand-logo" />
          <span className="brand-name">ShopNova</span>
        </Link>
        
        {/* Search Bar - Hidden on small mobile */}
        <form className="search-bar" onSubmit={handleSearch}>
          <input 
            type="text" 
            placeholder="Search for products..." 
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-btn">
            <Search size={18} />
          </button>
        </form>

        {/* Actions */}
        <div className="header-actions">
          <Link to="/profile" className="action-btn icon-only hide-mobile">
            <User size={22} />
          </Link>
          <Link to="/cart" className="action-btn cart-btn">
            <ShoppingCart size={22} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
          <button className="action-btn menu-btn show-mobile">
            <Menu size={24} />
          </button>
        </div>

      </div>

      {/* Categories Nav (Desktop) */}
      <nav className="header-nav hide-mobile">
        <div className="container nav-container">
          <Link to="/products?category=Electronics" className="nav-link">Electronics</Link>
          <Link to="/products?category=Fashion" className="nav-link">Fashion</Link>
          <Link to="/products?category=Home & Garden" className="nav-link">Home & Garden</Link>
          <Link to="/products?category=Sports" className="nav-link">Sports</Link>
          <Link to="/products" className="nav-link highlight">Special Offers</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
