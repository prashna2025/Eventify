import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CalendarDays, Home, PlusCircle, Ticket } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">
        <CalendarDays color="var(--accent)" />
        Event<span>Nova</span>
      </Link>
      
      <div className="nav-links">
        <Link to="/" className={`nav-link ${isActive('/')}`}>
          <Home size={18} /> Home
        </Link>
        <Link to="/bookings" className={`nav-link ${isActive('/bookings')}`}>
          <Ticket size={18} /> My Bookings
        </Link>
        <Link to="/create-event" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
          <PlusCircle size={18} /> Create Event
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
