// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loggedInOwner, setLoggedInOwner] = useState(null);

  const login = (ownerData) => {
    setLoggedInOwner(ownerData);
  };

  const logout = () => {
    setLoggedInOwner(null);
  };

  return (
    <AuthContext.Provider value={{ loggedInOwner, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth, AuthContext };
