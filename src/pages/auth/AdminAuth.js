import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../../axiosConfig';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { register, adminLogin } from '../../slices/authSlice';

const AdminAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    adminSecret: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await dispatch(register(formData));
      toast.success('Admin registered successfully!');
      navigate('/admin/login');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await dispatch(adminLogin({
        email: formData.email,
        password: formData.password
      }));
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.isAdmin) {
        toast.success('Logged in successfully!');
        const from = location.state?.from?.pathname || '/admin/dashboard';
        navigate(from);
      } else {
        toast.error('Invalid admin credentials');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isRegistering ? 'Admin Registration' : 'Admin Login'}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={isRegistering ? handleRegister : handleLogin}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            {isRegistering && (
              <div>
                <label htmlFor="adminSecret" className="sr-only">Admin Secret</label>
                <input
                  id="adminSecret"
                  name="adminSecret"
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Admin Secret"
                  value={formData.adminSecret}
                  onChange={handleChange}
                />
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isRegistering ? 'Register Admin' : 'Login'}
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              {isRegistering 
                ? 'Already have an admin account? Login'
                : 'Need to create admin account? Register'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminAuth;
