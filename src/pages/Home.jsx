import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventCard from '../components/EventCard';
import { Sparkles } from 'lucide-react';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axios.get('/api/events');
        setEvents(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load events. Is the backend running?');
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) return <div className="loading">Loading amazing events...</div>;
  if (error) return <div className="loading" style={{color: 'var(--danger)'}}>{error}</div>;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            Upcoming Events <Sparkles color="var(--accent)" size={32} />
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
            Discover and book tickets for the most exclusive events near you.
          </p>
        </div>
      </div>
      
      {events.length === 0 ? (
        <div className="glass-panel text-center">
          <h3>No events found</h3>
          <p className="mb-3">Be the first to create an amazing event!</p>
        </div>
      ) : (
        <div className="grid-container">
          {events.map(event => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
