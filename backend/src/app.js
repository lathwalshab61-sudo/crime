import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import caseRoutes from './routes/caseRoutes.js';
import evidenceRoutes from './routes/evidenceRoutes.js';
import locationRoutes from './routes/locationRoutes.js';
import labRoutes from './routes/labRoutes.js';
import telemetryRoutes from './routes/telemetryRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// Standard Middlewares
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Health Check / API Root
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    department: 'Metropolitan Criminology & Forensics Suite v4.12',
    accreditation: 'ISO/IEC 17025',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Mount Routes
app.use('/api/cases', caseRoutes);
app.use('/api/evidence', evidenceRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/lab', labRoutes);
app.use('/api/telemetry', telemetryRoutes);
app.use('/api/reports', reportRoutes);

// Fallback for unmatched routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Endpoint ${req.originalUrl} not found on CrimeScene Hub API.`
  });
});

// Central Error Handler
app.use(errorHandler);

export default app;

