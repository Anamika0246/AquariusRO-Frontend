import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    // Handle navigation in useEffect
    if (!token || !user) {
      navigate('/login', { replace: true });
    } else if (!user.isAdmin) {
      navigate('/', { replace: true });
    }
  }, [token, user, navigate]);

  // In render phase, just check auth state and return children if valid
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (!user.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
