import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SearchBar.module.css';

const SearchBar = () => {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    // We will build the /events page and its query parsing on Day 3
    navigate(`/events?search=${keyword}&category=${category}`);
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSearch}>
      <div className={styles.inputGroup}>
        <input 
          type="text" 
          placeholder="Search events, venues, or cities..." 
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className={styles.input}
        />
      </div>
      <div className={styles.divider}></div>
      <div className={styles.inputGroup}>
        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
          className={styles.select}
        >
          <option value="">All Categories</option>
          <option value="Technology">Technology</option>
          <option value="Music">Music</option>
          <option value="Food & Drink">Food & Drink</option>
        </select>
      </div>
      <button type="submit" className={styles.submitBtn}>
        Search
      </button>
    </form>
  );
};

export default SearchBar;

