import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Order from './pages/Order';
import OrderConfirmation from './pages/OrderConfirmation';
import Login from './pages/auth/Login';
import Profile from './pages/auth/Profile';
import Footer from './components/Footer';
import { ThemeProvider } from './context/ThemeContext';
import PrivateRoute from './components/PrivateRoute';
import Orders from './pages/Orders';
import AdminRoute from './components/AdminRoute';
import AdminDashboard from './pages/AdminDashboard';
import AdminOrders from './pages/AdminOrders';
import AdminCoupons from './pages/AdminCoupons';
import AdminAuth from './pages/auth/AdminAuth';

function App() {
  return (
    <ThemeProvider>
        <Navbar />
        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/order" element={<PrivateRoute>
              <Order />
            </PrivateRoute>} />
            <Route path="/order/:id" element={<PrivateRoute>
              <OrderConfirmation />
            </PrivateRoute>} />
            <Route path="/orders" element={<PrivateRoute><Orders /></PrivateRoute>} />
            <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/admin/orders" element={<AdminRoute><AdminOrders /></AdminRoute>} />
            <Route path="/admin/coupons" element={<AdminRoute><AdminCoupons /></AdminRoute>} />
            <Route path="/admin/login" element={<AdminAuth />} />
          </Routes>
        </main>
        <Footer />
    </ThemeProvider>
  );
}

export default App;
