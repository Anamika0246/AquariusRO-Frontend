import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  CalendarIcon, 
  ClockIcon, 
  MapPinIcon, 
  CurrencyDollarIcon 
} from '@heroicons/react/24/outline';
import axios from 'axios';
import { toast } from 'react-toastify';

const Orders = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/orders`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setOrders(response.data);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-900">No Orders Yet</h2>
          <p className="mt-2 text-gray-600">You haven't placed any orders yet.</p>
          <button
            onClick={() => navigate('/services')}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-aquarius-light hover:bg-aquarius-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aquarius-light"
          >
            Place an Order
          </button>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flow-root">
              <ul role="list" className="-my-5 divide-y divide-gray-200">
                {orders.map((order) => (
                  <li key={order._id} className="py-5">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 truncate">
                          {order.serviceType === 'party' && 'Party Aqua'}
                          {order.serviceType === 'workplace' && 'Workplace Hydro'}
                          {order.serviceType === 'everyday' && 'Daily Pure'}
                        </h3>
                        <div className="mt-1 flex items-center text-sm text-gray-500">
                          <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                          {new Date(order.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="ml-5 flex-shrink-0">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          order.status === 'completed' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <MapPinIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                      <p className="truncate">{order.address}</p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <CurrencyDollarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                      <p>₹{order.totalAmount}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
