// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

// Dummy auth hook
const useAuth = () => {
  return { isAuthenticated: false }; // change to true to simulate login
};

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
