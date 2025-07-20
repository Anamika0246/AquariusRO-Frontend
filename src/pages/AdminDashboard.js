import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../axiosConfig';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const fetchAdminData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch orders
      const ordersRes = await api.get('/api/admin/orders');
      console.log('Orders Response:', ordersRes.data);
      
      // Fetch coupons
      const couponsRes = await api.get('/api/admin/coupons');
      console.log('Coupons Response:', couponsRes.data);
      
      // Fetch services
      const servicesRes = await api.get('/api/admin/services');
      console.log('Services Response:', servicesRes.data);
      
      setOrders(ordersRes.data || []);
      setCoupons(couponsRes.data || []);
      setServices(servicesRes.data || []);
    } catch (error) {
      console.error('API Error:', error);
      setError(error.response?.data?.message || error.message || 'Failed to fetch data');
      setOrders([]);
      setCoupons([]);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };
  const updateOrderStatus = async (orderId, status) => {
    try {
      await api.put(`/api/order/${orderId}/status`, { status });
      toast.success('Order status updated successfully');
      fetchAdminData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update order status');
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      {loading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : orders.length === 0 && coupons.length === 0 && services.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No data available. Please try refreshing the page.</p>
          <button
            onClick={fetchAdminData}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Refresh
          </button>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-8 mt-12">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <button
              onClick={() => navigate('/admin/orders')}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              View All Orders
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Orders Summary */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
              <div className="space-y-4">
                {orders.slice(0, 3).map((order) => (
                  <div key={order._id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Order #{order.orderNumber}</p>
                      <p className="text-sm text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => updateOrderStatus(order._id, 'processing')}
                        className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded"
                      >
                        Process
                      </button>
                      <button
                        onClick={() => updateOrderStatus(order._id, 'completed')}
                        className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded"
                      >
                        Complete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Coupons */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Active Coupons</h2>
              <div className="space-y-4">
                {coupons.map((coupon) => (
                  <div key={coupon._id} className="p-4 bg-gray-50 rounded">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{coupon.code}</p>
                        <p className="text-sm text-gray-600">{coupon.description}</p>
                      </div>
                      <div className="text-sm text-gray-600">
                        {coupon.discount}% off
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Services</h2>
              <div className="space-y-4">
                {services.map((service) => (
                  <div key={service._id} className="p-4 bg-gray-50 rounded">
                    <h3 className="font-medium">{service.name}</h3>
                    <p className="text-sm text-gray-600">{service.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.slice(0, 5).map((order) => (
                    <tr key={order._id}>
                      <td className="px-6 py-4 whitespace-nowrap">{order.userId.username}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{order.serviceType}</td>
                      <td className="px-6 py-4 whitespace-nowrap">₹{order.price}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.status === 'completed' ? 'bg-green-100 text-green-800' :
                          order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                          <option value="pending">Pending</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
