import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('shopnova_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('shopnova_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item._id === (product._id || product.id));
      if (existing) {
        return prev.map(item => 
          item._id === (product._id || product.id) 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, _id: product._id || product.id, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item._id !== productId));
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};
