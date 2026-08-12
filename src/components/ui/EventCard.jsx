import { Link } from 'react-router-dom';
import styles from './EventCard.module.css';

const EventCard = ({ event }) => {
  // Format date to be more readable
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={event.image} alt={event.title} className={styles.image} />
        <span className={styles.category}>{event.category}</span>
      </div>
      
      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={styles.date}>📅 {formattedDate}</span>
          <span className={styles.price}>${event.price}</span>
        </div>
        
        <h3 className={styles.title}>{event.title}</h3>
        <p className={styles.location}>📍 {event.venue}, {event.city}</p>
        
        <Link to={`/events/${event.id}`} className={styles.button}>
          View Details
        </Link>
      </div>
    </div>
  );
};

export default EventCard;