import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Login from './pages/Login';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import Patients from './pages/admin/Patients';
import Appointments from './pages/admin/Appointments';
import HealthRecords from './pages/admin/HealthRecords';
import Notifications from './pages/admin/Notifications';

// User pages
import UserDashboard from './pages/user/UserDashboard';
import MyRecords from './pages/user/MyRecords';
import MyAppointments from './pages/user/MyAppointments';
import MyNotifications from './pages/user/MyNotifications';

const AppRoutes: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={
        isAuthenticated ? (
          <Navigate to={user?.role === 'admin' ? '/admin' : '/dashboard'} replace />
        ) : (
          <Login />
        )
      } />
      
      {/* Admin Routes */}
      <Route path="/admin" element={
        <ProtectedRoute requireRole="admin">
          <Layout>
            <AdminDashboard />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/admin/patients" element={
        <ProtectedRoute requireRole="admin">
          <Layout>
            <Patients />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/admin/appointments" element={
        <ProtectedRoute requireRole="admin">
          <Layout>
            <Appointments />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/admin/records" element={
        <ProtectedRoute requireRole="admin">
          <Layout>
            <HealthRecords />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/admin/notifications" element={
        <ProtectedRoute requireRole="admin">
          <Layout>
            <Notifications />
          </Layout>
        </ProtectedRoute>
      } />

      {/* User Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute requireRole="user">
          <Layout>
            <UserDashboard />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/dashboard/records" element={
        <ProtectedRoute requireRole="user">
          <Layout>
            <MyRecords />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/dashboard/appointments" element={
        <ProtectedRoute requireRole="user">
          <Layout>
            <MyAppointments />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/dashboard/notifications" element={
        <ProtectedRoute requireRole="user">
          <Layout>
            <MyNotifications />
          </Layout>
        </ProtectedRoute>
      } />

      {/* Default redirect */}
      <Route path="/" element={
        <Navigate to={isAuthenticated ? (user?.role === 'admin' ? '/admin' : '/dashboard') : '/login'} replace />
      } />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;