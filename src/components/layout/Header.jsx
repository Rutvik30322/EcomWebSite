import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, LogOut, Package } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { user, logout, isAuthenticated } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="header glass">
      <div className="container header-container">
        
        {/* Brand */}
        <Link to="/" className="brand">
          <div className="brand-logo-wrapper">
             <img src="/logo.png" alt="ChocoLux Logo" />
          </div>
          <span className="brand-name">ChocoLux</span>
        </Link>
        
        {/* Search Bar */}
        <form className="search-bar" onSubmit={handleSearch}>
          <input 
            type="text" 
            placeholder="Search chocolates, gifts, flavors..." 
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
          {isAuthenticated ? (
            <div className="user-dropdown-trigger">
              <Link to="/my-orders" className="action-btn icon-only hide-mobile" title="My Orders">
                <Package size={22} />
              </Link>
              <button onClick={logout} className="action-btn icon-only hide-mobile" title="Logout">
                <LogOut size={22} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="action-btn icon-only hide-mobile" title="Login">
              <User size={22} />
            </Link>
          )}
          
          <Link to="/cart" className="action-btn cart-btn">
            <div className="cart-icon-wrapper">
              <ShoppingCart size={22} />
              {cartCount > 0 && <span className="cart-badge animate-fade-in">{cartCount}</span>}
            </div>
            <span className="hide-mobile">Cart</span>
          </Link>
          
          <button className="action-btn menu-btn show-mobile">
            <Menu size={24} />
          </button>
        </div>

      </div>

      {/* Categories Nav */}
      <nav className="header-nav hide-mobile">
        <div className="container nav-container">
          <Link to="/products" className="nav-link">All Chocolates</Link>
          <Link to="/products?category=Dark Chocolate" className="nav-link">Dark Chocolate</Link>
          <Link to="/products?category=Milk Chocolate" className="nav-link">Milk Chocolate</Link>
          <Link to="/products?category=White Chocolate" className="nav-link">White Chocolate</Link>
          <Link to="/products?category=Gift Boxes" className="nav-link">Gift Boxes</Link>
          <Link to="/my-orders" className="nav-link">My Orders</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;

