import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import UserPage from './pages/UserPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('role') === 'admin');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    setIsAuthenticated(!!token);
    setIsAdmin(role === 'admin');
  }, []);

  return (
    <Router>
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to={isAdmin ? '/dashboard' : '/user-booking'} replace /> : <LoginPage />}
        />
        <Route
          path="/user-booking"
          element={isAuthenticated ? <UserPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/dashboard"
          element={isAuthenticated && isAdmin ? <AdminPage /> : <Navigate to="/login" replace />}
        />
        <Route path="*" element={<Navigate to={isAuthenticated ? (isAdmin ? '/dashboard' : '/user-booking') : '/login'} replace />} />
      </Routes>
    </Router>
  );
};

export default App;
