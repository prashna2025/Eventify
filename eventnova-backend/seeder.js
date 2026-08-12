import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Event from './models/Event.js';
import eventsData from './data/events.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // 1. Wipe the database completely clean
    await Event.deleteMany();

    // 2. Insert our dummy data
    await Event.insertMany(eventsData);

    console.log('✅ Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error importing data: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Event.deleteMany();
    console.log('🗑️ Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error destroying data: ${error.message}`);
    process.exit(1);
  }
};

// Check if we passed the "-d" flag in the terminal
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}