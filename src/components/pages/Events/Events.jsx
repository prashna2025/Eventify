import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import EventCard from '../../components/ui/EventCard';
import Pagination from '../../components/ui/Pagination';
import { eventsData } from '../../data/eventsData';
import styles from './Events.module.css';

const ITEMS_PER_PAGE = 4; // Set low to demonstrate pagination with our dummy data

const Events = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Read initial states from URL if they exist
  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || '';
  const initialPage = parseInt(searchParams.get('page')) || 1;

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [currentPage, setCurrentPage] = useState(initialPage);

  // Update URL whenever filters or page changes
  useEffect(() => {
    const params = {};
    if (searchTerm) params.search = searchTerm;
    if (category) params.category = category;
    if (currentPage > 1) params.page = currentPage;
    setSearchParams(params);
  }, [searchTerm, category, currentPage, setSearchParams]);

  // Derived state: Filtered events
  const filteredEvents = useMemo(() => {
    return eventsData.filter(event => {
      const matchesSearch = 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.city.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = category ? event.category === category : true;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, category]);

  // Derived state: Pagination
  const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);
  const currentEvents = filteredEvents.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Handlers
  const handleFilterChange = (e, type) => {
    if (type === 'search') setSearchTerm(e.target.value);
    if (type === 'category') setCategory(e.target.value);
    setCurrentPage(1); // Reset to first page when filtering
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h1>Explore Events</h1>
        <p>Find the perfect experience for your next outing.</p>
      </div>

      <div className={styles.filterBar}>
        <input 
          type="text" 
          placeholder="Search by title, venue, or city..."
          value={searchTerm}
          onChange={(e) => handleFilterChange(e, 'search')}
          className={styles.input}
        />
        <select 
          value={category} 
          onChange={(e) => handleFilterChange(e, 'category')}
          className={styles.select}
        >
          <option value="">All Categories</option>
          <option value="Technology">Technology</option>
          <option value="Music">Music</option>
          <option value="Food & Drink">Food & Drink</option>
        </select>
      </div>

      {currentEvents.length > 0 ? (
        <>
          <div className={styles.grid}>
            {currentEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={setCurrentPage} 
          />
        </>
      ) : (
        <div className={styles.noResults}>
          <h3>No events found 😢</h3>
          <p>Try adjusting your search or category filters.</p>
          <button 
            className={styles.clearBtn}
            onClick={() => {
              setSearchTerm('');
              setCategory('');
            }}
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Events;