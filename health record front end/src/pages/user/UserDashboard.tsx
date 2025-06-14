import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, FileText, Bell, Heart, Pill, Activity } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { mockAppointments, mockHealthRecords, mockNotifications, mockPatients } from '../../data/mockData';

const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  
  // Find current user's patient data
  const currentPatient = mockPatients.find(p => p.name === user?.name);
  
  // Filter data for current user
  const userAppointments = mockAppointments.filter(apt => apt.patientId === currentPatient?.id);
  const userRecords = mockHealthRecords.filter(record => record.patientId === currentPatient?.id);
  const userNotifications = mockNotifications.filter(n => n.userId === user?.id || !n.userId);

  const upcomingAppointments = userAppointments.filter(apt => apt.status === 'scheduled');
  const unreadNotifications = userNotifications.filter(n => !n.read);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl text-white p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
            <p className="text-blue-100">Here's an overview of your health information</p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white bg-opacity-20 p-4 rounded-lg">
              <Heart className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Upcoming Appointments</p>
              <p className="text-3xl font-bold text-blue-600">{upcomingAppointments.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Health Records</p>
              <p className="text-3xl font-bold text-purple-600">{userRecords.length}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <FileText className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">New Notifications</p>
              <p className="text-3xl font-bold text-yellow-600">{unreadNotifications.length}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Bell className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Appointments */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h2>
              <Link 
                to="/dashboard/appointments"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View all
              </Link>
            </div>
          </div>
          <div className="p-6">
            {upcomingAppointments.length > 0 ? (
              <div className="space-y-4">
                {upcomingAppointments.slice(0, 3).map((appointment) => (
                  <div key={appointment.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{appointment.type}</h3>
                      <p className="text-sm text-gray-600">
                        {formatDate(appointment.date)} at {appointment.time}
                      </p>
                      <p className="text-xs text-gray-500">{appointment.doctor}</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {appointment.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No upcoming appointments</p>
                <Link 
                  to="/dashboard/appointments"
                  className="inline-flex items-center mt-2 text-blue-600 hover:text-blue-700"
                >
                  Book an appointment
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Recent Health Records */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Health Records</h2>
              <Link 
                to="/dashboard/records"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View all
              </Link>
            </div>
          </div>
          <div className="p-6">
            {userRecords.length > 0 ? (
              <div className="space-y-4">
                {userRecords.slice(0, 3).map((record) => (
                  <div key={record.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <FileText className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{record.diagnosis}</h3>
                      <p className="text-sm text-gray-600">
                        {formatDate(record.date)} - {record.doctor}
                      </p>
                    </div>
                    {record.followUpRequired && (
                      <div className="text-right">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Follow-up
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No health records available</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Health Summary */}
      {currentPatient && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Health Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                <Activity className="h-5 w-5 text-red-500 mr-2" />
                Medical Conditions
              </h3>
              <div className="space-y-2">
                {currentPatient.medicalHistory.map((condition, index) => (
                  <span
                    key={index}
                    className="inline-block bg-red-100 text-red-800 text-sm px-3 py-1 rounded-full mr-2 mb-2"
                  >
                    {condition}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                <Bell className="h-5 w-5 text-yellow-500 mr-2" />
                Allergies
              </h3>
              <div className="space-y-2">
                {currentPatient.allergies.map((allergy, index) => (
                  <span
                    key={index}
                    className="inline-block bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded-full mr-2 mb-2"
                  >
                    {allergy}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                <Pill className="h-5 w-5 text-blue-500 mr-2" />
                Current Medications
              </h3>
              <div className="space-y-2">
                {currentPatient.medications.map((medication, index) => (
                  <span
                    key={index}
                    className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full mr-2 mb-2"
                  >
                    {medication}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/dashboard/appointments"
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Calendar className="h-6 w-6 text-blue-600" />
            <div>
              <h3 className="font-medium text-gray-900">Book Appointment</h3>
              <p className="text-sm text-gray-600">Schedule a new appointment</p>
            </div>
          </Link>
          <Link
            to="/dashboard/records"
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FileText className="h-6 w-6 text-purple-600" />
            <div>
              <h3 className="font-medium text-gray-900">View Records</h3>
              <p className="text-sm text-gray-600">Access your health records</p>
            </div>
          </Link>
          <Link
            to="/dashboard/notifications"
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Bell className="h-6 w-6 text-yellow-600" />
            <div>
              <h3 className="font-medium text-gray-900">Notifications</h3>
              <p className="text-sm text-gray-600">Check your messages</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;