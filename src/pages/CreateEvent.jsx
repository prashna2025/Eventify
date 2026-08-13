import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PlusCircle } from 'lucide-react';

const CreateEvent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    category: '',
    venue: '',
    city: '',
    date: '',
    price: 0,
    description: '',
    organizer: '',
    availableSeats: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await axios.post('/api/events', formData);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create event');
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Create New Event</h1>
          <p className="text-secondary">Host an unforgettable experience.</p>
        </div>
      </div>

      <div className="glass-panel">
        {error && (
          <div className="mb-4" style={{ padding: '1rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', borderRadius: 'var(--radius)', border: '1px solid var(--danger)' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid-container" style={{ gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div className="form-group mb-0">
              <label className="form-label">Event Title</label>
              <input type="text" name="title" className="form-control" required value={formData.title} onChange={handleChange} placeholder="Summer Music Festival" />
            </div>
            <div className="form-group mb-0">
              <label className="form-label">Category</label>
              <select name="category" className="form-control" required value={formData.category} onChange={handleChange}>
                <option value="" disabled>Select Category</option>
                <option value="Music">Music</option>
                <option value="Technology">Technology</option>
                <option value="Business">Business</option>
                <option value="Arts">Arts</option>
                <option value="Sports">Sports</option>
                <option value="Food">Food</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Image URL</label>
            <input type="url" name="image" className="form-control" required value={formData.image} onChange={handleChange} placeholder="https://example.com/image.jpg" />
          </div>

          <div className="grid-container" style={{ gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div className="form-group mb-0">
              <label className="form-label">Venue Name</label>
              <input type="text" name="venue" className="form-control" required value={formData.venue} onChange={handleChange} placeholder="Madison Square Garden" />
            </div>
            <div className="form-group mb-0">
              <label className="form-label">City</label>
              <input type="text" name="city" className="form-control" required value={formData.city} onChange={handleChange} placeholder="New York" />
            </div>
          </div>

          <div className="grid-container" style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div className="form-group mb-0">
              <label className="form-label">Date & Time</label>
              <input type="datetime-local" name="date" className="form-control" required value={formData.date} onChange={handleChange} />
            </div>
            <div className="form-group mb-0">
              <label className="form-label">Ticket Price ($)</label>
              <input type="number" name="price" className="form-control" required min="0" step="0.01" value={formData.price} onChange={handleChange} />
            </div>
            <div className="form-group mb-0">
              <label className="form-label">Available Seats</label>
              <input type="number" name="availableSeats" className="form-control" required min="1" value={formData.availableSeats} onChange={handleChange} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Organizer Name</label>
            <input type="text" name="organizer" className="form-control" required value={formData.organizer} onChange={handleChange} placeholder="EventNova LLC" />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea name="description" className="form-control" required value={formData.description} onChange={handleChange} placeholder="Tell people what this event is about..." />
          </div>

          <div className="text-center mt-4">
            <button type="submit" className="btn btn-primary" style={{ padding: '1rem 3rem' }} disabled={loading}>
              <PlusCircle size={20} /> {loading ? 'Creating...' : 'Create Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
