import { Patient, HealthRecord, Appointment, Notification } from '../types';

export const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1985-03-15',
    gender: 'male',
    address: '123 Main St, Anytown, ST 12345',
    emergencyContact: 'Jane Smith - +1 (555) 987-6543',
    medicalHistory: ['Hypertension', 'Type 2 Diabetes'],
    allergies: ['Penicillin', 'Shellfish'],
    medications: ['Metformin 500mg', 'Lisinopril 10mg'],
    lastVisit: '2024-01-15',
    nextAppointment: '2024-02-15'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 234-5678',
    dateOfBirth: '1992-07-22',
    gender: 'female',
    address: '456 Oak Ave, Springfield, ST 67890',
    emergencyContact: 'Mike Johnson - +1 (555) 876-5432',
    medicalHistory: ['Asthma'],
    allergies: ['Pollen', 'Dust mites'],
    medications: ['Albuterol inhaler'],
    lastVisit: '2024-01-20',
    nextAppointment: '2024-03-01'
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael.brown@email.com',
    phone: '+1 (555) 345-6789',
    dateOfBirth: '1978-11-08',
    gender: 'male',
    address: '789 Pine Rd, Oakville, ST 13579',
    emergencyContact: 'Lisa Brown - +1 (555) 765-4321',
    medicalHistory: ['High cholesterol', 'Arthritis'],
    allergies: ['None known'],
    medications: ['Atorvastatin 20mg', 'Ibuprofen 400mg'],
    lastVisit: '2024-01-10',
    nextAppointment: '2024-02-28'
  }
];

export const mockHealthRecords: HealthRecord[] = [
  {
    id: '1',
    patientId: '2',
    date: '2024-01-20',
    diagnosis: 'Asthma exacerbation',
    treatment: 'Increased inhaler usage, prescribed prednisone',
    notes: 'Patient reported increased shortness of breath. Lung function tests show mild obstruction.',
    doctor: 'Dr. Sarah Johnson',
    followUpRequired: true
  },
  {
    id: '2',
    patientId: '1',
    date: '2024-01-15',
    diagnosis: 'Routine diabetes check',
    treatment: 'Continued current medication regimen',
    notes: 'HbA1c levels stable at 7.2%. Blood pressure well controlled.',
    doctor: 'Dr. Michael Chen',
    followUpRequired: false
  },
  {
    id: '3',
    patientId: '3',
    date: '2024-01-10',
    diagnosis: 'Arthritis management',
    treatment: 'Physical therapy referral, medication adjustment',
    notes: 'Joint pain has increased. Recommended PT and adjusted anti-inflammatory dosage.',
    doctor: 'Dr. Emily Davis',
    followUpRequired: true
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    patientId: '1',
    patientName: 'John Smith',
    date: '2024-02-15',
    time: '10:00 AM',
    doctor: 'Dr. Michael Chen',
    type: 'Follow-up',
    status: 'scheduled',
    notes: 'Diabetes management follow-up'
  },
  {
    id: '2',
    patientId: '2',
    patientName: 'Sarah Johnson',
    date: '2024-03-01',
    time: '2:30 PM',
    doctor: 'Dr. Sarah Johnson',
    type: 'Routine Check-up',
    status: 'scheduled',
    notes: 'Annual physical examination'
  },
  {
    id: '3',
    patientId: '3',
    patientName: 'Michael Brown',
    date: '2024-02-28',
    time: '11:15 AM',
    doctor: 'Dr. Emily Davis',
    type: 'Consultation',
    status: 'scheduled',
    notes: 'Arthritis treatment review'
  },
  {
    id: '4',
    patientId: '1',
    patientName: 'John Smith',
    date: '2024-01-15',
    time: '9:00 AM',
    doctor: 'Dr. Michael Chen',
    type: 'Follow-up',
    status: 'completed',
    notes: 'Completed diabetes check'
  }
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Appointment Reminder',
    message: 'You have an appointment tomorrow at 10:00 AM with Dr. Michael Chen.',
    type: 'info',
    date: '2024-02-14',
    read: false,
    userId: '2'
  },
  {
    id: '2',
    title: 'Lab Results Available',
    message: 'Your recent blood work results are now available for review.',
    type: 'success',
    date: '2024-02-12',
    read: false,
    userId: '2'
  },
  {
    id: '3',
    title: 'System Maintenance',
    message: 'The system will undergo maintenance this weekend from 2-4 AM.',
    type: 'warning',
    date: '2024-02-10',
    read: true
  },
  {
    id: '4',
    title: 'New Patient Registered',
    message: 'A new patient has been registered in the system.',
    type: 'info',
    date: '2024-02-09',
    read: false
  },
  {
    id: '5',
    title: 'Medication Reminder',
    message: 'Remember to take your evening medication.',
    type: 'info',
    date: '2024-02-08',
    read: true,
    userId: '2'
  }
];