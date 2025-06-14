import React, { useState } from 'react';
import { Search, Plus, FileText, User, Calendar, AlertCircle } from 'lucide-react';
import { mockHealthRecords, mockPatients } from '../../data/mockData';

const HealthRecords: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [records] = useState(mockHealthRecords);

  const filteredRecords = records.filter(record => {
    const patient = mockPatients.find(p => p.id === record.patientId);
    return patient?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
           record.doctor.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Health Records</h1>
          <p className="text-gray-600 mt-2">Manage patient health records and medical history</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Plus className="h-5 w-5" />
          <span>Add Record</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search records by patient, diagnosis, or doctor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Records List */}
      <div className="space-y-4">
        {filteredRecords.map((record) => {
          const patient = mockPatients.find(p => p.id === record.patientId);
          return (
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
                          <User className="h-4 w-4" />
                          <span>{patient?.name}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(record.date)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {record.followUpRequired && (
                      <div className="flex items-center space-x-1 text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-sm font-medium">Follow-up Required</span>
                      </div>
                    )}
                    <button className="text-blue-600 hover:text-blue-800 font-medium">
                      Edit
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Treatment</h4>
                    <p className="text-gray-600 mb-4">{record.treatment}</p>
                    
                    <h4 className="font-medium text-gray-900 mb-2">Doctor</h4>
                    <p className="text-gray-600">{record.doctor}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Notes</h4>
                    <p className="text-gray-600">{record.notes}</p>
                  </div>
                </div>

                {/* Patient Summary */}
                {patient && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-3">Patient Summary</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500 mb-1">Medical History</p>
                        <div className="flex flex-wrap gap-1">
                          {patient.medicalHistory.slice(0, 2).map((condition, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-red-100 text-red-800"
                            >
                              {condition}
                            </span>
                          ))}
                          {patient.medicalHistory.length > 2 && (
                            <span className="text-xs text-gray-500">
                              +{patient.medicalHistory.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1">Allergies</p>
                        <div className="flex flex-wrap gap-1">
                          {patient.allergies.slice(0, 2).map((allergy, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800"
                            >
                              {allergy}
                            </span>
                          ))}
                          {patient.allergies.length > 2 && (
                            <span className="text-xs text-gray-500">
                              +{patient.allergies.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1">Current Medications</p>
                        <div className="flex flex-wrap gap-1">
                          {patient.medications.slice(0, 2).map((medication, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
                            >
                              {medication}
                            </span>
                          ))}
                          {patient.medications.length > 2 && (
                            <span className="text-xs text-gray-500">
                              +{patient.medications.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredRecords.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No health records found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default HealthRecords;