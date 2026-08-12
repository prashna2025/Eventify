import Booking from '../models/Booking.js';
import Event from '../models/Event.js';

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Public
export const createBooking = async (req, res) => {
  try {
    const { eventId, name, email, tickets } = req.body;

    // 1. Find the event
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // 2. Validate seat availability
    if (event.availableSeats < tickets) {
      return res.status(400).json({ message: 'Not enough available seats for this event.' });
    }

    // 3. Calculate total price securely on the backend
    const totalPaid = event.price * tickets;

    // 4. Create and save the booking
    const booking = new Booking({
      event: eventId,
      name,
      email,
      tickets,
      totalPaid,
    });

    const createdBooking = await booking.save();

    // 5. Deduct seats from the event and save it
    event.availableSeats -= tickets;
    await event.save();

    res.status(201).json(createdBooking);
  } catch (error) {
    res.status(500).json({ message: 'Server Error while creating booking' });
  }
};

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Public
export const getBookings = async (req, res) => {
  try {
    // .populate() replaces the 'event' ID with actual event data (title, date, image)
    const bookings = await Booking.find()
      .populate('event', 'title date image venue')
      .sort({ createdAt: -1 }); // Newest bookings first
      
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server Error fetching bookings' });
  }
};

// @desc    Cancel a booking
// @route   DELETE /api/bookings/:id
// @access  Public
export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // 1. Find the associated event and refund the seats
    const event = await Event.findById(booking.event);
    if (event) {
      event.availableSeats += booking.tickets;
      await event.save();
    }

    // 2. Delete the booking
    await booking.deleteOne();
    
    res.json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error cancelling booking' });
  }
};