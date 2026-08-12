import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Event', // This tells Mongoose which model to link to
    },
    name: { 
      type: String, 
      required: true 
    },
    email: { 
      type: String, 
      required: true 
    },
    tickets: { 
      type: Number, 
      required: true 
    },
    totalPaid: { 
      type: Number, 
      required: true 
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;