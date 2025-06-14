import React from 'react';
import { FileText, Calendar, User, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { mockHealthRecords, mockPatients } from '../../data/mockData';

const MyRecords: React.FC = () => {
  const { user } = useAuth();
  
  // Find current user's patient data
  const currentPatient = mockPatients.find(p => p.name === user?.name);
  const userRecords = mockHealthRecords.filter(record => record.patientId === currentPatient?.id);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Health Records</h1>
        <p className="text-gray-600 mt-2">Your complete medical history and health information</p>
      </div>

      {/* Health Summary Card */}
      {currentPatient && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Health Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Medical History</h3>
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
              <h3 className="font-medium text-gray-900 mb-3">Allergies</h3>
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
              <h3 className="font-medium text-gray-900 mb-3">Current Medications</h3>
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

      {/* Records List */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">Medical Records</h2>
        
        {userRecords.length > 0 ? (
          <div className="space-y-4">
            {userRecords
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map((record) => (
                <div key={record.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="bg-purple-100 p-3 rounded-lg">
                          <FileText className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{record.diagnosis}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{formatDate(record.date)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <User className="h-4 w-4" />
                              <span>{record.doctor}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {record.followUpRequired && (
                        <div className="flex items-center space-x-1 text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full">
                          <AlertCircle className="h-4 w-4" />
                          <span className="text-sm font-medium">Follow-up Required</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Treatment</h4>
                        <p className="text-gray-600 mb-4">{record.treatment}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Notes</h4>
                        <p className="text-gray-600">{record.notes}</p>
                      </div>
                    </div>

                    {record.followUpRequired && (
                      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <AlertCircle className="h-5 w-5 text-yellow-600" />
                          <p className="text-yellow-800 font-medium">Follow-up Appointment Required</p>
                        </div>
                        <p className="text-yellow-700 text-sm mt-1">
                          Please schedule a follow-up appointment with {record.doctor} to continue your treatment plan.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
            <div className="text-center">
              <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Health Records</h3>
              <p className="text-gray-600">
                You don't have any health records yet. Your medical history will appear here after your first appointment.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Contact Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <AlertCircle className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-medium text-blue-900 mb-2">Questions about your records?</h3>
            <p className="text-blue-800 text-sm mb-3">
              If you have any questions about your health records or need clarification about your treatment,
              please don't hesitate to contact your healthcare provider.
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyRecords;