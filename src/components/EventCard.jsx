import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users } from 'lucide-react';

const EventCard = ({ event }) => {
  const date = new Date(event.date).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="card">
      <img src={event.image} alt={event.title} className="card-img" />
      <div className="card-body">
        <h3 className="card-title">{event.title}</h3>
        
        <div className="card-meta">
          <Calendar size={16} /> {date}
        </div>
        <div className="card-meta">
          <MapPin size={16} /> {event.venue}, {event.city}
        </div>
        <div className="card-meta">
          <Users size={16} /> {event.availableSeats} seats left
        </div>
        
        <div className="card-footer">
          <span className="price">${event.price}</span>
          <Link to={`/event/${event._id}`} className="btn btn-secondary">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
