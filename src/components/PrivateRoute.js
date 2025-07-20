import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { checkAuth } from '../slices/authSlice';

const PrivateRoute = ({ children, adminOnly = false }) => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  // If we have a token but no user, try to fetch user info
  React.useEffect(() => {
    if (token && !user) {
      dispatch(checkAuth());
    }
  }, [token, user, dispatch]);

  // If not authenticated, redirect to login
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // If adminOnly route and user is not admin, redirect to profile
  if (adminOnly && !user.isAdmin) {
    return <Navigate to="/profile" replace />;
  }

  // If not adminOnly and user is admin, redirect to admin dashboard
  if (!adminOnly && user.isAdmin) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
};

export default PrivateRoute;
