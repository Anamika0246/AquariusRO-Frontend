import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminPrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    // If not logged in, redirect to login
    return <Navigate to="/login" />;
  }

  if (!user.isAdmin) {
    // If logged in but not admin, redirect to home or dashboard
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminPrivateRoute;
