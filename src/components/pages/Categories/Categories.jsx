import { Link } from 'react-router-dom';
import styles from './Categories.module.css';

const categories = [
  { name: 'Technology', icon: '💻', color: '#e0f2fe' },
  { name: 'Music', icon: '🎸', color: '#fce7f3' },
  { name: 'Food & Drink', icon: '🍔', color: '#fef3c7' },
  { name: 'Art & Culture', icon: '🎨', color: '#eedeff' },
  { name: 'Sports', icon: '⚽', color: '#dcfce7' },
  { name: 'Networking', icon: '🤝', color: '#ffedd5' }
];

const Categories = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Browse by Category</h1>
        <p>Find events that match your interests.</p>
      </div>
      <div className={styles.grid}>
        {categories.map(cat => (
          <Link key={cat.name} to={`/events?category=${encodeURIComponent(cat.name)}`} className={styles.card} style={{ backgroundColor: cat.color }}>
            <span className={styles.icon}>{cat.icon}</span>
            <h2>{cat.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;