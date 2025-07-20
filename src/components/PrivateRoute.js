import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from '../slices/authSlice';

const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token && !user) {
      // If we have a token but no user, check auth
      dispatch(checkAuth());
    }

    // Handle navigation in useEffect
    if (!token || !user) {
      navigate('/login', { replace: true });
    } else if (user.isAdmin) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [token, dispatch, user]);

  // In render phase, just check auth state and return children if valid
  if (!token || !user) {
    return null; // Navigation will happen in useEffect
  }

  if (user.isAdmin) {
    return null; // Navigation will happen in useEffect
  }

  return children;
};

export default PrivateRoute;
