import axios from '../axiosConfig';

export const createRazorpayOrder = async (amount, orderId) => {
  try {
    const response = await axios.post('/api/payment/create', {
      amount,
      orderId
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyPayment = async (paymentDetails) => {
  try {
    const response = await axios.post('/api/payment/verify', paymentDetails);
    return response.data;
  } catch (error) {
    throw error;
  }
};
