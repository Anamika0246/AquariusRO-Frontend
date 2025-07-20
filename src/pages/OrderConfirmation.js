import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from '../axiosConfig';
import { CreditCardIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import PaymentButton from '../components/PaymentButton';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);

  const order = location.state?.order;
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    if (order) {
      setOrderId(order._id);
    }
  }, [order]);

  const handlePaymentSuccess = async () => {
    try {
      setLoading(true);
      // Update order status in backend
      await axios.patch(`/api/orders/${orderId}`, { status: 'Paid' });
      toast.success('Payment successful! Order status updated.');
      navigate('/orders');
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update order status. Please contact support.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
      </div>
    );
  }

  if (!order) {
    return <div className="min-h-screen flex items-center justify-center">Order not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold text-center mb-6">Order Confirmation</h2>
          
          <div className="space-y-4">
            <div className="border-b pb-4">
              <h3 className="text-lg font-semibold">Order Details</h3>
              <div className="mt-2 space-y-2">
                <p><strong>Service Type:</strong> {order.serviceType}</p>
                <p><strong>Quantity:</strong> {order.quantity} cans</p>
                <p><strong>Address:</strong> {order.address}</p>
                {order.couponCode && (
                  <p><strong>Coupon:</strong> {order.couponCode}</p>
                )}
                <p><strong>Total Amount:</strong> ₹{order.price}</p>
              </div>
            </div>

            <div className="border-b pb-4">
              <h3 className="text-lg font-semibold">Delivery Details</h3>
              <div className="mt-2 space-y-2">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Contact:</strong> {user.phone}</p>
              </div>
            </div>

            <div className="pt-4">
              <PaymentButton
                amount={order.price}
                orderId={orderId}
                onPaymentSuccess={handlePaymentSuccess}
              />
            </div>

            <div className="pt-4">
              <button
                onClick={() => navigate('/orders')}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                View All Orders
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
