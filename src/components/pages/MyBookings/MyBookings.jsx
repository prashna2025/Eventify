import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import styles from './MyBookings.module.css';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const { showToast } = useToast();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('eventnova_bookings')) || [];
    setBookings(data);
  }, []);

  const cancelBooking = (id) => {
    if(window.confirm('Are you sure you want to cancel this booking?')) {
      const updated = bookings.filter(b => b.id !== id);
      setBookings(updated);
      localStorage.setItem('eventnova_bookings', JSON.stringify(updated));
      showToast('Booking cancelled successfully');
    }
  };

  return (
    <div className={styles.container}>
      <h1>My Bookings</h1>
      {bookings.length === 0 ? (
        <div className={styles.empty}>
          <p>You have no upcoming events.</p>
          <Link to="/events" className={styles.browseBtn}>Browse Events</Link>
        </div>
      ) : (
        <div className={styles.list}>
          {bookings.map(booking => (
            <div key={booking.id} className={styles.card}>
              <div className={styles.info}>
                <h3>{booking.eventTitle}</h3>
                <p>Date: {new Date(booking.eventDate).toLocaleDateString()}</p>
                <p>Tickets: {booking.tickets}</p>
                <p>Total Paid: <strong>${booking.totalPaid}</strong></p>
              </div>
              <button onClick={() => cancelBooking(booking.id)} className={styles.cancelBtn}>
                Cancel Booking
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;