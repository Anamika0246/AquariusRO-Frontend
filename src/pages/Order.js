import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PlusIcon, MinusIcon, CreditCardIcon, TagIcon } from '@heroicons/react/24/outline';

const Order = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [serviceType, setServiceType] = useState('party');
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);

  // Sample service prices (in real app, fetch from backend)
  const servicePrices = {
    party: 200,
    workplace: 100,
    everyday: 50
  };

  const handleQuantityChange = (type) => {
    if (type === 'increase') {
      setQuantity((prev) => prev + 1);
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
    calculateFinalPrice();
  };

  const handleCouponApply = async () => {
    // In real app, this would make an API call to validate coupon
    // For now, just applying a sample discount
    if (couponCode === 'WATER20') {
      setDiscount(20);
    } else if (couponCode === 'PARTY50') {
      setDiscount(50);
    } else {
      setDiscount(0);
    }
    calculateFinalPrice();
  };

  const calculateFinalPrice = () => {
    const basePrice = servicePrices[serviceType] * quantity;
    setFinalPrice(basePrice - discount);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    // In real app, this would make an API call to create order
    // For now, just showing success message
    alert('Order placed successfully!');
    navigate('/payment');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8">Place Your Order</h1>
        
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          {/* Service Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Service Type</label>
            <div className="mt-1">
              <select
                value={serviceType}
                onChange={(e) => {
                  setServiceType(e.target.value);
                  calculateFinalPrice();
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-aquarius-light focus:ring focus:ring-aquarius-light focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="party">Party Aqua</option>
                <option value="workplace">Workplace Hydro</option>
                <option value="everyday">Daily Pure</option>
              </select>
            </div>
          </div>

          {/* Quantity Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Quantity</label>
            <div className="mt-1 flex items-center">
              <button
                onClick={() => handleQuantityChange('decrease')}
                className="p-2 rounded-l-md border border-gray-300 bg-white dark:bg-gray-700 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <MinusIcon className="h-5 w-5" />
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (value > 0) setQuantity(value);
                }}
                className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aquarius-light"
              />
              <button
                onClick={() => handleQuantityChange('increase')}
                className="p-2 rounded-r-md border border-gray-300 bg-white dark:bg-gray-700 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <PlusIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Address */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Delivery Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-aquarius-light focus:ring focus:ring-aquarius-light focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter delivery address"
            />
          </div>

          {/* Coupon Code */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Coupon Code</label>
              <span className="text-sm text-gray-600 dark:text-gray-400">{discount > 0 && `-${discount}₹ off`}</span>
            </div>
            <div className="mt-1 flex">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-aquarius-light focus:ring focus:ring-aquarius-light focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter coupon code"
              />
              <button
                onClick={handleCouponApply}
                className="ml-2 px-4 py-2 bg-aquarius-light text-white rounded-md hover:bg-aquarius-dark transition duration-300"
              >
                Apply
              </button>
            </div>
          </div>

          {/* Price Summary */}
          <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <TagIcon className="h-6 w-6 mr-2 text-gray-500 dark:text-gray-400" />
                <span className="text-sm font-medium">Base Price</span>
              </div>
              <span className="text-sm font-medium">{servicePrices[serviceType] * quantity}₹</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center">
                  <TagIcon className="h-6 w-6 mr-2 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm font-medium">Discount</span>
                </div>
                <span className="text-sm font-medium">-{discount}₹</span>
              </div>
            )}
            <div className="border-t border-gray-200 dark:border-gray-600 my-4"></div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <CreditCardIcon className="h-6 w-6 mr-2 text-gray-500 dark:text-gray-400" />
                <span className="text-sm font-medium">Total Amount</span>
              </div>
              <span className="text-xl font-bold">{finalPrice}₹</span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              className="w-full bg-aquarius-dark text-white py-3 rounded-md hover:bg-aquarius-light transition duration-300"
            >
              Proceed to Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Order;
