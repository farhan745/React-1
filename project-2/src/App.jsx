// src/App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ContactsDashboard from "./components/ContactsDashboard";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const { currentUser } = useAuth();

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={
          currentUser ? <Navigate to="/" /> : <Login />
        } />
        <Route path="/signup" element={
          currentUser ? <Navigate to="/" /> : <Signup />
        } />
        
        {/* Protected Route */}
        <Route path="/" element={
          <PrivateRoute>
            <ContactsDashboard />
          </PrivateRoute>
        } />
        
        {/* Redirect to login if no route matches */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      
      <ToastContainer position="bottom-center" />
    </>
  );
};

export default App;