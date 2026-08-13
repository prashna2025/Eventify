import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Calendar, MapPin, Users, Tag, Info, ArrowLeft, Ticket } from 'lucide-react';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Booking Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [tickets, setTickets] = useState(1);
  const [bookingStatus, setBookingStatus] = useState(null); // null, 'loading', 'success', 'error'

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data } = await axios.get(`/api/events/${id}`);
        setEvent(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();
    setBookingStatus('loading');
    
    try {
      const bookingData = {
        event: id,
        name,
        email,
        tickets: Number(tickets),
        totalPaid: event.price * tickets
      };
      
      await axios.post('/api/bookings', bookingData);
      setBookingStatus('success');
      
      // Update available seats locally
      setEvent({...event, availableSeats: event.availableSeats - tickets});
      
      // Reset form
      setName('');
      setEmail('');
      setTickets(1);
      
      setTimeout(() => setBookingStatus(null), 5000); // Clear message after 5s
    } catch (error) {
      setBookingStatus('error');
    }
  };

  if (loading) return <div className="loading">Loading event details...</div>;
  if (!event) return <div className="loading" style={{color: 'var(--danger)'}}>Event not found.</div>;

  const date = new Date(event.date).toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
  });

  return (
    <div>
      <button onClick={() => navigate(-1)} className="btn btn-secondary mb-4" style={{ padding: '0.5rem 1rem' }}>
        <ArrowLeft size={16} /> Back
      </button>
      
      <div className="grid-container" style={{ gridTemplateColumns: '1.5fr 1fr', gap: '3rem' }}>
        {/* Left Column: Event Details */}
        <div>
          <img src={event.image} alt={event.title} style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: 'var(--radius)', marginBottom: '2rem' }} />
          
          <h1 className="page-title mb-2">{event.title}</h1>
          <div className="flex gap-4 mb-4" style={{ flexWrap: 'wrap' }}>
            <div className="card-meta" style={{ fontSize: '1rem', color: 'var(--accent)' }}>
              <Tag size={18} /> {event.category}
            </div>
            <div className="card-meta" style={{ fontSize: '1rem' }}>
              <Calendar size={18} /> {date}
            </div>
            <div className="card-meta" style={{ fontSize: '1rem' }}>
              <MapPin size={18} /> {event.venue}, {event.city}
            </div>
          </div>
          
          <div className="glass-panel mb-4" style={{ padding: '1.5rem' }}>
            <h3 className="mb-2 flex items-center gap-2"><Info size={20}/> About this event</h3>
            <p style={{ color: 'var(--text-secondary)', whiteSpace: 'pre-line' }}>{event.description}</p>
          </div>
          
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <p><strong>Organizer:</strong> {event.organizer}</p>
          </div>
        </div>

        {/* Right Column: Booking Box */}
        <div>
          <div className="glass-panel" style={{ position: 'sticky', top: '100px' }}>
            <div className="flex justify-between items-center mb-4 pb-4" style={{ borderBottom: '1px solid var(--border-color)' }}>
              <div>
                <p className="text-secondary mb-1">Price</p>
                <h2 className="price">${event.price}</h2>
              </div>
              <div className="text-right">
                <p className="text-secondary mb-1">Status</p>
                <div className="flex items-center gap-2" style={{ color: event.availableSeats > 0 ? 'var(--success)' : 'var(--danger)', fontWeight: 'bold' }}>
                  <Users size={20} />
                  {event.availableSeats > 0 ? `${event.availableSeats} seats left` : 'Sold Out'}
                </div>
              </div>
            </div>

            <h3 className="mb-3">Book Tickets</h3>
            
            {bookingStatus === 'success' && (
              <div className="mb-3" style={{ padding: '1rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', borderRadius: 'var(--radius)', border: '1px solid var(--success)' }}>
                Booking successful! Enjoy the event.
              </div>
            )}
            
            {bookingStatus === 'error' && (
              <div className="mb-3" style={{ padding: '1rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', borderRadius: 'var(--radius)', border: '1px solid var(--danger)' }}>
                Failed to book tickets. Please try again.
              </div>
            )}

            <form onSubmit={handleBooking}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input type="text" className="form-control" required value={name} onChange={e => setName(e.target.value)} placeholder="John Doe" disabled={event.availableSeats === 0 || bookingStatus === 'loading'} />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input type="email" className="form-control" required value={email} onChange={e => setEmail(e.target.value)} placeholder="john@example.com" disabled={event.availableSeats === 0 || bookingStatus === 'loading'} />
              </div>
              <div className="form-group">
                <label className="form-label">Number of Tickets</label>
                <input type="number" className="form-control" required min="1" max={event.availableSeats} value={tickets} onChange={e => setTickets(e.target.value)} disabled={event.availableSeats === 0 || bookingStatus === 'loading'} />
              </div>
              
              <div className="flex justify-between items-center mb-4" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                <span>Total:</span>
                <span className="price">${(event.price * tickets).toFixed(2)}</span>
              </div>
              
              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem' }} disabled={event.availableSeats === 0 || bookingStatus === 'loading'}>
                {bookingStatus === 'loading' ? 'Processing...' : (
                  <>
                    <Ticket size={20} /> {event.availableSeats === 0 ? 'Sold Out' : 'Confirm Booking'}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
