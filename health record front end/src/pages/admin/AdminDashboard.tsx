import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Calendar, FileText, Bell, TrendingUp, Activity } from 'lucide-react';
import { mockPatients, mockAppointments, mockHealthRecords, mockNotifications } from '../../data/mockData';

const AdminDashboard: React.FC = () => {
  const totalPatients = mockPatients.length;
  const upcomingAppointments = mockAppointments.filter(apt => apt.status === 'scheduled').length;
  const totalRecords = mockHealthRecords.length;
  const unreadNotifications = mockNotifications.filter(n => !n.read).length;

  const recentAppointments = mockAppointments
    .filter(apt => apt.status === 'scheduled')
    .slice(0, 5);

  const recentRecords = mockHealthRecords
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const stats = [
    {
      name: 'Total Patients',
      value: totalPatients,
      icon: Users,
      color: 'bg-blue-500',
      link: '/admin/patients'
    },
    {
      name: 'Upcoming Appointments',
      value: upcomingAppointments,
      icon: Calendar,
      color: 'bg-green-500',
      link: '/admin/appointments'
    },
    {
      name: 'Health Records',
      value: totalRecords,
      icon: FileText,
      color: 'bg-purple-500',
      link: '/admin/records'
    },
    {
      name: 'Unread Notifications',
      value: unreadNotifications,
      icon: Bell,
      color: 'bg-yellow-500',
      link: '/admin/notifications'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-lg">
          <Activity className="h-5 w-5 text-blue-600" />
          <span className="text-blue-700 font-medium">System Online</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Link
            key={stat.name}
            to={stat.link}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Appointments */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h2>
              <Link 
                to="/admin/appointments"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View all
              </Link>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{appointment.patientName}</h3>
                    <p className="text-sm text-gray-600">
                      {appointment.date} at {appointment.time}
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
          </div>
        </div>

        {/* Recent Health Records */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Health Records</h2>
              <Link 
                to="/admin/records"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View all
              </Link>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentRecords.map((record) => {
                const patient = mockPatients.find(p => p.id === record.patientId);
                return (
                  <div key={record.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <FileText className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{patient?.name}</h3>
                      <p className="text-sm text-gray-600">{record.diagnosis}</p>
                      <p className="text-xs text-gray-500">{record.date} - {record.doctor}</p>
                    </div>
                    {record.followUpRequired && (
                      <div className="text-right">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Follow-up
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/admin/patients"
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Users className="h-6 w-6 text-blue-600" />
            <div>
              <h3 className="font-medium text-gray-900">Manage Patients</h3>
              <p className="text-sm text-gray-600">Add, edit, or view patient information</p>
            </div>
          </Link>
          <Link
            to="/admin/appointments"
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Calendar className="h-6 w-6 text-green-600" />
            <div>
              <h3 className="font-medium text-gray-900">Schedule Appointment</h3>
              <p className="text-sm text-gray-600">Book new appointments for patients</p>
            </div>
          </Link>
          <Link
            to="/admin/records"
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FileText className="h-6 w-6 text-purple-600" />
            <div>
              <h3 className="font-medium text-gray-900">Add Health Record</h3>
              <p className="text-sm text-gray-600">Create new patient health records</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;