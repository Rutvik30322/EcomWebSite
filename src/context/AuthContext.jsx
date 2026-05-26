import React, { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../services/apiClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('websiteToken'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('websiteUser');
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, [token]);

  const login = async (mobile, password) => {
    try {
      const response = await apiClient.post('/auth/login', { mobile, password });
      const { user: userData, token: userToken } = response.data.data;
      
      setUser(userData);
      setToken(userToken);
      localStorage.setItem('websiteToken', userToken);
      localStorage.setItem('websiteUser', JSON.stringify(userData));
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  const signup = async (userData) => {
    try {
      const response = await apiClient.post('/auth/register', userData);
      const { user: newUser, token: userToken } = response.data.data;
      
      setUser(newUser);
      setToken(userToken);
      localStorage.setItem('websiteToken', userToken);
      localStorage.setItem('websiteUser', JSON.stringify(newUser));
      
      return { success: true };
    } catch (error) {
      console.error('Signup error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Signup failed' 
      };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('websiteToken');
    localStorage.removeItem('websiteUser');
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ user, token, loading, login, signup, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
