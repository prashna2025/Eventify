import Event from '../models/Event.js';

// @desc    Fetch all events (with optional keyword and category filters)
// @route   GET /api/events
// @access  Public
export const getEvents = async (req, res) => {
  try {
    // Read query parameters passed from frontend (e.g., /api/events?keyword=Music&category=Music)
    const keyword = req.query.keyword
      ? {
          $or: [
            { title: { $regex: req.query.keyword, $options: 'i' } },
            { venue: { $regex: req.query.keyword, $options: 'i' } },
            { city: { $regex: req.query.keyword, $options: 'i' } }
          ]
        }
      : {};

    const category = req.query.category 
      ? { category: req.query.category } 
      : {};

    // Combine filters and search the database
    const events = await Event.find({ ...keyword, ...category }).sort({ date: 1 });
    
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Server Error loading events' });
  }
};

// @desc    Fetch a single event by ID
// @route   GET /api/events/:id
// @access  Public
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Invalid Event ID or Server Error' });
  }
};