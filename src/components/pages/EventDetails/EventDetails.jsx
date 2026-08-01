import { useParams, useNavigate, Link } from 'react-router-dom';
import { eventsData } from '../../data/eventsData';
import styles from './EventDetails.module.css';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const event = eventsData.find(e => e.id === id);

  if (!event) {
    return (
      <div className={styles.notFound}>
        <h2>Event Not Found</h2>
        <Link to="/events" className={styles.backBtn}>Back to Events</Link>
      </div>
    );
  }

  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div className={styles.container}>
      <button className={styles.backLink} onClick={() => navigate(-1)}>
        &larr; Back
      </button>
      
      <div className={styles.hero} style={{ backgroundImage: `url(${event.image})` }}>
        <div className={styles.overlay}>
          <span className={styles.category}>{event.category}</span>
          <h1>{event.title}</h1>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.mainInfo}>
          <h2>About This Event</h2>
          <p className={styles.description}>{event.description}</p>
          
          <div className={styles.detailsGrid}>
            <div className={styles.detailItem}>
              <span className={styles.icon}>📅</span>
              <div>
                <strong>Date & Time</strong>
                <p>{formattedDate}</p>
              </div>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.icon}>📍</span>
              <div>
                <strong>Location</strong>
                <p>{event.venue}, {event.city}</p>
              </div>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.icon}>👤</span>
              <div>
                <strong>Organizer</strong>
                <p>{event.organizer}</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.sidebar}>
          <div className={styles.bookingCard}>
            <h3>Ticket Info</h3>
            <div className={styles.priceRow}>
              <span>Price:</span>
              <span className={styles.price}>${event.price}</span>
            </div>
            <div className={styles.seatsRow}>
              <span>Available Seats:</span>
              <span>{event.availableSeats}</span>
            </div>
            <Link to={`/book/${event.id}`} className={styles.bookBtn}>
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;