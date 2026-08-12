import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { eventsData } from '../../data/eventsData';
import styles from './BookEvent.module.css';

const BookEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = eventsData.find(e => e.id === id);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    tickets: 1
  });

  if (!event) return <h2>Event not found</h2>;

  const total = formData.tickets * event.price;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newBooking = {
      id: `bk-${Date.now()}`,
      eventId: event.id,
      eventTitle: event.title,
      eventDate: event.date,
      ...formData,
      totalPaid: total,
      bookingDate: new Date().toISOString()
    };

    const existingBookings = JSON.parse(localStorage.getItem('eventnova_bookings')) || [];
    localStorage.setItem('eventnova_bookings', JSON.stringify([...existingBookings, newBooking]));

    alert('Booking Successful!'); // We will upgrade this to a Toast in Day 6
    navigate('/my-bookings');
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.summary}>
          <h2>Booking Summary</h2>
          <img src={event.image} alt={event.title} className={styles.image} />
          <h3>{event.title}</h3>
          <p>📍 {event.venue}</p>
          <p>📅 {new Date(event.date).toLocaleDateString()}</p>
          <div className={styles.priceCalc}>
            <span>${event.price} x {formData.tickets} tickets</span>
            <strong>Total: ${total}</strong>
          </div>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <h2>Attendee Details</h2>
          <div className={styles.formGroup}>
            <label>Full Name</label>
            <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
          </div>
          <div className={styles.formGroup}>
            <label>Email Address</label>
            <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
          </div>
          <div className={styles.formGroup}>
            <label>Number of Tickets</label>
            <select value={formData.tickets} onChange={(e) => setFormData({...formData, tickets: parseInt(e.target.value)})}>
              {[1,2,3,4,5].map(num => <option key={num} value={num}>{num}</option>)}
            </select>
          </div>
          <button type="submit" className={styles.submitBtn}>Confirm Booking</button>
        </form>
      </div>
    </div>
  );
};

export default BookEvent;