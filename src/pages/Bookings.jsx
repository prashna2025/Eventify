import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Ticket, Calendar, MapPin } from 'lucide-react';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await axios.get('/api/bookings');
        setBookings(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load bookings.');
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (loading) return <div className="loading">Loading your tickets...</div>;
  if (error) return <div className="loading" style={{color: 'var(--danger)'}}>{error}</div>;

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">My Bookings</h1>
          <p className="text-secondary">View and manage your event tickets.</p>
        </div>
      </div>

      {bookings.length === 0 ? (
        <div className="glass-panel text-center">
          <h3 className="mb-2">No bookings found</h3>
          <p>You haven't booked any tickets yet. Explore upcoming events!</p>
        </div>
      ) : (
        <div className="flex" style={{ flexDirection: 'column', gap: '1.5rem' }}>
          {bookings.map((booking) => (
            <div key={booking._id} className="glass-panel" style={{ display: 'flex', gap: '2rem', padding: '0', overflow: 'hidden' }}>
              <div style={{ background: 'var(--accent)', width: '20px' }}></div>
              <div style={{ padding: '1.5rem', flex: 1 }}>
                <div className="flex justify-between items-center mb-3">
                  <h3 style={{ fontSize: '1.4rem' }}>{booking.event?.title || 'Unknown Event'}</h3>
                  <div className="flex items-center gap-2" style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '0.4rem 1rem', borderRadius: '20px', color: 'var(--accent)', fontWeight: 'bold' }}>
                    <Ticket size={18} /> {booking.tickets} Tickets
                  </div>
                </div>
                
                <div className="flex gap-4 mb-3">
                  {booking.event && (
                    <>
                      <div className="card-meta">
                        <Calendar size={16} /> {new Date(booking.event.date).toLocaleDateString()}
                      </div>
                      <div className="card-meta">
                        <MapPin size={16} /> {booking.event.venue}
                      </div>
                    </>
                  )}
                </div>

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Booked by: <strong>{booking.name}</strong></p>
                  </div>
                  <div>
                    <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Total Paid: <span className="price">${booking.totalPaid.toFixed(2)}</span></p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookings;
