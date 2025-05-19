const express = require('express');
const { connectToOrientDB } = require('./config/db');
const healthcareProviderRoutes = require('./routes/healthcareProvider.routes');
const citizenRoutes = require('./routes/citizen.routes');
const appointmentRoutes = require('./routes/appointment.routes');
const medicalRecordRoutes = require('./routes/medicalRecord.routes');
const facilityRoutes = require('./routes/healthFacility.routes');
const userAccountRoutes = require('./routes/userAccount.routes');
const authRoutes = require('./routes/auth.routes');
const systemAdminRoutes = require('./routes/systemAdmin.routes');
const labTechnicianRoutes = require('./routes/labTechnician.routes');
const labResultRoutes = require('./routes/labResult.routes');
const regionalHealthAuthorityRoutes = require('./routes/regionalHealthAuthority.routes');
const pharmacistRoutes = require('./routes/pharmacist.routes');
const healthReportRoutes = require('./routes/healthReport.route');
const MinistryHealthOfficialRoutes = require('./routes/MinistryHealthOfficial.routes');
const PrescriptionRoutes = require('./routes/prescription.routes');


const app = express();
app.use(express.json());

// Register routes
app.use('/api/providers', healthcareProviderRoutes); // Healthcare Providers route
app.use('/api/citizens', citizenRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/records', medicalRecordRoutes);
app.use('/api/facilities', facilityRoutes);
app.use('/api/users', userAccountRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/system-admins', systemAdminRoutes);
app.use('/api/lab-technicians', labTechnicianRoutes);
app.use('/api/lab-results', labResultRoutes);
app.use('/api/regional-health-authorities', regionalHealthAuthorityRoutes);
app.use('/api/pharmacists', pharmacistRoutes);
app.use('/api/health-reports', healthReportRoutes);
app.use('/api/ministry-health-officials', MinistryHealthOfficialRoutes);
app.use('/api/prescriptions', PrescriptionRoutes);




// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Connect to DB and start server
connectToOrientDB().then(() => {
  app.listen(3000, () => {
    console.log('Server running on port 3000');
  });
}).catch(err => {
  console.error('Failed to connect to OrientDB:', err);
});
