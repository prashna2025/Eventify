import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    venue: { type: String, required: true },
    city: { type: String, required: true },
    date: { type: Date, required: true },
    price: { type: Number, required: true, default: 0 },
    description: { type: String, required: true },
    organizer: { type: String, required: true },
    availableSeats: { type: Number, required: true, default: 0 }
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Event = mongoose.model('Event', eventSchema);

export default Event;