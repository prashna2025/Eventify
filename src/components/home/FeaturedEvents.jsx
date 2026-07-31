import { eventsData } from '../../data/eventsData';
import EventCard from '../ui/EventCard';
import styles from './FeaturedEvents.module.css';
import { Link } from 'react-router-dom';

const FeaturedEvents = () => {
  // Grab the first 3 events to showcase
  const featured = eventsData.slice(0, 3);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Trending Events</h2>
          <Link to="/events" className={styles.viewAll}>
            View All Events &rarr;
          </Link>
        </div>
        
        <div className={styles.grid}>
          {featured.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;