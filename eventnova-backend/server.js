import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import eventRoutes from './routes/eventRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js'; // NEW IMPORT

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// MOUNT ROUTES
app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoutes); // NEW ROUTE

app.get('/', (req, res) => {
  res.send('EventNova API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
}) ;
//commented