import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors()); // Allows frontend (port 5173) to communicate with backend (port 5000)
app.use(express.json()); // Allows us to accept JSON data in the body

// Basic route to test the server
app.get('/', (req, res) => {
  res.send('EventNova API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});