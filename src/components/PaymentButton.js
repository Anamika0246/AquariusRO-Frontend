// import React, { useState, useEffect } from 'react';
// import { toast } from 'react-toastify';
// import { createRazorpayOrder, verifyPayment } from '../services/paymentService';

// const PaymentButton = ({ amount, orderId, onPaymentSuccess }) => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Load Razorpay script dynamically
//     const script = document.createElement('script');
//     script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//     script.async = true;
//     script.onload = () => {
//       console.log('Razorpay script loaded successfully');
//       // Check if Razorpay is loaded
//       if (!window.Razorpay) {
//         setError('Razorpay script failed to load');
//         console.error('Razorpay not available in window');
//       }
//     };
//     script.onerror = () => {
//       setError('Failed to load Razorpay script');
//       console.error('Failed to load Razorpay script');
//     };
//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   const handlePayment = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       // Create Razorpay order
//       const razorpayOrder = await createRazorpayOrder(amount, orderId);
//       console.log('Razorpay order created:', razorpayOrder);
      
//       // Initialize Razorpay checkout
//       const options = {
//         key: process.env.REACT_APP_RAZORPAY_KEY, // Your Razorpay key
//         amount: parseInt(razorpayOrder.amount * 100), // Convert to paise (multiply by 100)
//         currency: 'INR',
//         name: 'Aquarius RO',
//         description: 'Payment for RO Water Purifier Order',
//         order_id: razorpayOrder.orderId,
//         handler: async function (response) {
//           try {
//             console.log('Razorpay response:', response);
//             // Verify payment
//             const paymentDetails = {
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_signature: response.razorpay_signature
//             };

//             await verifyPayment(paymentDetails);
//             onPaymentSuccess();
//             toast.success('Payment successful!');
//           } catch (error) {
//             console.error('Payment verification failed:', error);
//             toast.error('Payment verification failed. Please try again.');
//           }
//         },
//         prefill: {
//           name: 'Customer Name',
//           email: 'customer@example.com',
//           contact: '9999999999'
//         },
//         theme: {
//           color: '#43b883'
//         }
//       };

//       console.log('Razorpay options:', options);
//       console.log('Razorpay script:', razorpayScript);

//       // Open Razorpay checkout
//       const rzp = new razorpayScript(options);
//       rzp.open();
//     } catch (error) {
//       console.error('Payment initialization failed:', error);
//       console.error('Payment initialization failed error:', error);
//       setError(error.message);
//       toast.error('Failed to initialize payment. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       {error && (
//         <div className="text-red-500 mb-2">{error}</div>
//       )}
//       <button
//         onClick={handlePayment}
//         disabled={loading || !razorpayScript || !!error}
//         className={`px-6 py-3 rounded-lg transition-colors duration-200 ${
//           loading || !razorpayScript || !!error
//             ? 'bg-gray-400 cursor-not-allowed'
//             : 'bg-blue-600 hover:bg-blue-700 text-white'
//         }`}
//       >
//         {loading ? 'Processing...' : !razorpayScript ? 'Loading...' : error ? 'Error' : 'Pay Now'}
//       </button>
//     </div>
//   );
// };

// export default PaymentButton;
