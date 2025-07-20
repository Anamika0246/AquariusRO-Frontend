import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from '../slices/authSlice';

const PrivateRoute = ({ children, adminOnly = false }) => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Check auth if we have a token but no user
    if (token && !user) {
      dispatch(checkAuth());
    }

    // Handle navigation based on auth state
    if (!token || !user) {
      navigate('/login', { replace: true });
    } else if (user.isAdmin && !adminOnly) {
      // If user is admin but trying to access non-admin route
      navigate('/admin/dashboard', { replace: true });
    } else if (!user.isAdmin && adminOnly) {
      // If user is not admin but trying to access admin route
      navigate('/profile', { replace: true });
    }
  }, [token, dispatch, user, adminOnly]);

  // In render phase, just check auth state and return children if valid
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // For admin routes, check if user is admin
  if (adminOnly && (!user || !user.isAdmin)) {
    return <Navigate to="/profile" replace />;
  }

  // For non-admin routes, check if user is not admin
  if (!adminOnly && user && user.isAdmin) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
};

export default PrivateRoute;
