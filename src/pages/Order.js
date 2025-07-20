import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from '../slices/authSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../axiosConfig';
import { CreditCardIcon, TagIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

// Service types and their prices from backend
const SERVICE_PRICES = {
  workplace: 100,
  party: 200,
  everyday: 50
};

// Service options for display
const SERVICE_OPTIONS = [
  { value: 'workplace', label: 'Workplace (₹100/can)', price: SERVICE_PRICES.workplace },
  { value: 'party', label: 'Party (₹200/can)', price: SERVICE_PRICES.party },
  { value: 'everyday', label: 'Everyday Use (₹50/can)', price: SERVICE_PRICES.everyday }
];

const Order = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  // All hooks must be called at the top level, before any returns
  const [serviceType, setServiceType] = useState('party');
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);

  // Check auth status on mount and handle loading state
  useEffect(() => {
    // If we have a token but no user, check auth
    if (token && !user) {
      dispatch(checkAuth())
        .then(() => {
          // If auth check fails, token will be cleared and we'll redirect
          if (!localStorage.getItem('token')) {
            navigate('/login', { replace: true });
          }
        });
    }
    // If we have no token, redirect immediately
    else if (!token) {
      navigate('/login', { replace: true });
    }
  }, [dispatch, token, user, navigate]);

  // Update address state with user's address
  useEffect(() => {
    if (user?.address) {
      setAddress(user.address);
    }
  }, [user]);

  // Calculate final price based on service type and quantity
  useEffect(() => {
    const basePrice = SERVICE_PRICES[serviceType] || SERVICE_PRICES.party;
    setFinalPrice(basePrice * quantity - discount);
  }, [serviceType, quantity, discount]);

  // If we have no user or token, wait for auth check to complete
  if (!user || !token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const handlePayment = async () => {
    try {
      console.log('Starting order creation process');
      
      // Check if we have user data from Redux
      if (!user || !user._id) {
        console.log('No user data found in Redux');
        toast.error('Please login to create an order');
        return;
      }

      // Log user data
      console.log('User data:', {
        userId: user._id,
        email: user.email,
        name: user.name
      });

      // Log the request payload for debugging
      console.log('Order creation payload:', {
        serviceType,
        quantity,
        address,
        couponCode: couponCode || '',
        userId: user._id
      });

      // Create order on backend
      toast.info('Creating your order...');
      const startTime = performance.now();
      
      try {
        const response = await axios.post('/api/orders', {
          serviceType,
          quantity,
          address,
          couponCode: couponCode || '',
          userId: user._id
        });
        
        const endTime = performance.now();
        console.log(`Order creation API call took ${endTime - startTime}ms`);
        
        const order = response.data;
        console.log('Order creation successful:', {
          orderId: order._id,
          status: order.status,
          totalAmount: order.price
        });
        
        // Redirect to order confirmation page with order data
        navigate(`/order/${order._id}`, {
          state: {
            order: {
              ...order,
              serviceType: serviceType,
              quantity: quantity,
              address: address,
              couponCode: couponCode,
              discount: discount
            }
          }
        });
      } catch (apiError) {
        console.error('API call failed:', {
          status: apiError.response?.status,
          statusText: apiError.response?.statusText,
          data: apiError.response?.data,
          config: apiError.config,
          message: apiError.message
        });
        throw apiError;
      }
    } catch (error) {
      console.error('Order creation process failed:', error);
      
      // Log detailed error information
      const errorDetails = {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
        stack: error.stack,
        config: error.config
      };
      console.error('Complete error details:', errorDetails);
      
      if (error.response?.status === 401) {
        toast.error('Session expired. Please login again.');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
      } else if (error.response?.status === 500) {
        toast.error('Server error occurred. Please try again later.');
      } else if (error.response?.status === 400) {
        toast.error('Invalid order data. Please check your inputs.');
      } else {
        toast.error(error.response?.data?.message || 'Failed to create order. Please try again.');
      }
    }
  };

  const applyCoupon = async () => {
    if (!couponCode) {
      toast.error('Please enter a coupon code');
      return;
    }

    try {
      const response = await axios.post('/api/coupons/apply', {
        code: couponCode
      });

      const { discount } = response.data;
      setDiscount(discount);
      toast.success('Coupon applied successfully!');
    } catch (error) {
      console.error('Coupon error:', error);
      toast.error(error.response?.data?.message || 'Invalid coupon code');
    }
  };

  // Authentication check is handled in the useEffect above
  // so we don't need this explicit check anymore

  return (
    <div className="min-h-screen bg-gradient-to-b from-white dark:from-gray-800 to-gray-50 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16">
        {user ? (
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="pt-10 text-5xl font-bold mb-12 text-center bg-gradient-to-r from-aquarius-dark via-aquarius-light to-aquarius-dark bg-clip-text text-transparent"
            >
              Place Your Order
            </motion.h1>

            {/* Service Selection */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Type
                  </label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {SERVICE_OPTIONS.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Coupon Code (Optional)
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter coupon code"
                      />
                      <button
                        onClick={applyCoupon}
                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                  {discount > 0 && (
                    <div className="text-green-600">
                      <TagIcon className="h-4 w-4 inline-block mr-1" />
                      Coupon Applied: -₹{discount}
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(prev => prev + 1)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    +
                  </button>
                </div>
                <div>
                  <button
                    onClick={handlePayment}
                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    disabled={finalPrice <= 0 || !address || quantity <= 0}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <CreditCardIcon className="h-5 w-5" />
                      <span>Proceed to Payment</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
