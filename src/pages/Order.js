import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PlusIcon, MinusIcon, CreditCardIcon, TagIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Order = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const [serviceType, setServiceType] = useState('party');
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);

  useEffect(() => {
    // Calculate final price based on service type and quantity
    let basePrice = 0;
    if (serviceType === 'party') {
      basePrice = 500;
    } else if (serviceType === 'workplace') {
      basePrice = 1000;
    } else if (serviceType === 'everyday') {
      basePrice = 200;
    }
    setFinalPrice(basePrice * quantity - discount);
  }, [serviceType, quantity, discount]);

  const handlePayment = async () => {
    if (!user) {
      toast.error('Please log in to place an order');
      navigate('/login');
      return;
    }

    if (!address) {
      toast.error('Please enter your delivery address');
      return;
    }

    if (finalPrice <= 0) {
      toast.error('Please select a service and quantity');
      return;
    }

    try {
      toast.info('Creating your order...');

      // First create order on backend
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/orders`, {
        serviceType,
        quantity,
        address,
        couponCode,
        totalAmount: finalPrice,
        userId: user._id,
      }).catch(error => {
        console.error('Order creation error:', error);
        toast.error(error.response?.data?.message || 'Failed to create order. Please try again.');
        throw error;
      });

      const order = response.data;
      console.log('Order created:', order);
      
      // Create order ID for Razorpay.me
      const options = {
        amount: order.amount * 100, // Razorpay expects amount in paise
        currency: 'INR',
        name: 'Aquarius RO',
        description: `Order #${order.id}`,
        order_id: order.id,
        customer: {
          name: user.name,
          email: user.email,
          contact: user.phone,
        },
        theme: {
          color: '#3B82F6',
        },
      };

      // Create the payment URL
      const paymentUrl = `https://razorpay.me/@AquariusROlogo.jpg?amount=${options.amount}&currency=${options.currency}&order_id=${options.order_id}&name=${options.name}&description=${options.description}&customer_name=${options.customer.name}&customer_email=${options.customer.email}&customer_phone=${options.customer.contact}`;

      // Open payment URL in new tab
      window.open(paymentUrl, '_blank');

      // After payment is completed, user needs to manually refresh the page
      toast.info('Payment window opened in new tab. After successful payment, please refresh this page to see your order.');

    } catch (error) {
      console.error('Order creation error:', error);
      toast.error(error.response?.data?.message || 'Failed to place order. Please try again.');
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8 lg:py-12">
      <div className="max-w-screen-xl px-4 md:px-8 mx-auto">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 md:p-8">
            <h2 className="text-gray-800 text-2xl sm:text-3xl font-bold text-center mb-4 md:mb-8">Place Your Order</h2>

            <div className="grid md:grid-cols-2 gap-4 md:gap-8">
              {/* Service Selection */}
              <div className="space-y-4">
                <h3 className="text-gray-800 text-lg font-semibold">Select Service</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      id="party"
                      name="serviceType"
                      value="party"
                      checked={serviceType === 'party'}
                      onChange={(e) => setServiceType(e.target.value)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="party" className="text-gray-700">Party Aqua (₹500)</label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      id="workplace"
                      name="serviceType"
                      value="workplace"
                      checked={serviceType === 'workplace'}
                      onChange={(e) => setServiceType(e.target.value)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="workplace" className="text-gray-700">Workplace Hydro (₹1000)</label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      id="everyday"
                      name="serviceType"
                      value="everyday"
                      checked={serviceType === 'everyday'}
                      onChange={(e) => setServiceType(e.target.value)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="everyday" className="text-gray-700">Daily Pure (₹200)</label>
                  </div>
                </div>
              </div>

              {/* Quantity Selection */}
              <div className="space-y-4">
                <h3 className="text-gray-800 text-lg font-semibold">Quantity</h3>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    <MinusIcon className="w-5 h-5 text-gray-600" />
                  </button>
                  <span className="text-gray-800 font-semibold text-xl">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    <PlusIcon className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Address Form */}
            <div className="mt-8">
              <h3 className="text-gray-800 text-lg font-semibold mb-4">Delivery Address</h3>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your delivery address"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
              />
            </div>

            {/* Coupon Code */}
            <div className="mt-8">
              <h3 className="text-gray-800 text-lg font-semibold mb-4">Apply Coupon</h3>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => {
                    setCouponCode(e.target.value.toUpperCase());
                    if (e.target.value.toUpperCase() === 'WATER20') {
                      setDiscount(20);
                    } else if (e.target.value.toUpperCase() === 'PARTY50') {
                      setDiscount(50);
                    } else {
                      setDiscount(0);
                    }
                  }}
                  placeholder="Enter coupon code"
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => {
                    if (couponCode.toUpperCase() === 'WATER20') {
                      toast.success('20% discount applied!');
                    } else if (couponCode.toUpperCase() === 'PARTY50') {
                      toast.success('50% discount applied!');
                    } else {
                      toast.error('Invalid coupon code');
                    }
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Price Summary */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700">Base Price</span>
                <span className="font-semibold">₹{finalPrice + discount}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700">Discount</span>
                <span className="font-semibold text-green-600">-₹{discount}</span>
              </div>
              <div className="border-t border-gray-200 my-2"></div>
              <div className="flex justify-between items-center">
                <span className="text-gray-800 font-semibold">Total Amount</span>
                <span className="text-xl font-bold">₹{finalPrice}</span>
              </div>
            </div>

            {/* Payment Button */}
            <button
              onClick={handlePayment}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 mt-8"
              disabled={!address || finalPrice <= 0}
            >
              {finalPrice <= 0 ? 'Select Service' : 'Proceed to Payment'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
