import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import eventRoutes from './routes/eventRoutes.js'; // NEW IMPORT

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// MOUNT ROUTES HERE
app.use('/api/events', eventRoutes); 

app.get('/', (req, res) => {
  res.send('EventNova API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});