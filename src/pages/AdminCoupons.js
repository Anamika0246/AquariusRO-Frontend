import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';
import { toast } from 'react-toastify';

const AdminCoupons = () => {
  const navigate = useNavigate();
  const [coupons, setCoupons] = useState([]);
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    discount: 0
  });

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const response = await axios.get('/api/admin/coupons');
      setCoupons(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch coupons');
    }
  };

  const handleNewCouponChange = (e) => {
    setNewCoupon({
      ...newCoupon,
      [e.target.name]: e.target.value
    });
  };

  const createCoupon = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/admin/coupon', newCoupon);
      toast.success('Coupon created successfully');
      setNewCoupon({ code: '', discount: 0 });
      fetchCoupons();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create coupon');
    }
  };

  const updateCoupon = async (couponId, discount) => {
    try {
      await axios.put(`/api/admin/coupon/${couponId}`, { discount });
      toast.success('Coupon updated successfully');
      fetchCoupons();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update coupon');
    }
  };

  const deleteCoupon = async (couponId) => {
    if (!window.confirm('Are you sure you want to delete this coupon?')) return;
    try {
      await axios.delete(`/api/admin/coupon/${couponId}`);
      toast.success('Coupon deleted successfully');
      fetchCoupons();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete coupon');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Coupon Management</h1>
        <button
          onClick={() => navigate('/admin/coupons/new')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create New Coupon
        </button>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <form onSubmit={createCoupon} className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Coupon Code</label>
              <input
                type="text"
                name="code"
                value={newCoupon.code}
                onChange={handleNewCouponChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="COUPON10"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Discount Amount</label>
              <input
                type="number"
                name="discount"
                value={newCoupon.discount}
                onChange={handleNewCouponChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="100"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Create Coupon
          </button>
        </form>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Existing Coupons</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {coupons.map((coupon) => (
                  <tr key={coupon._id}>
                    <td className="px-6 py-4 whitespace-nowrap">{coupon.code}</td>
                    <td className="px-6 py-4 whitespace-nowrap">₹{coupon.discount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(coupon.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <input
                          type="number"
                          value={coupon.discount}
                          onChange={(e) => updateCoupon(coupon._id, e.target.value)}
                          className="w-24 px-2 py-1 border rounded"
                        />
                        <button
                          onClick={() => deleteCoupon(coupon._id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCoupons;
