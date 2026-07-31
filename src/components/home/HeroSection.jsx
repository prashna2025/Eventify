import SearchBar from '../ui/SearchBar';
import styles from './HeroSection.module.css';

const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.backgroundBlob}></div>
      <div className={styles.container}>
        <span className={styles.badge}>🎉 Discover your next experience</span>
        <h1 className={styles.title}>
          Unforgettable Events <br />
          Start <span>Here.</span>
        </h1>
        <p className={styles.subtitle}>
          Explore thousands of concerts, tech conferences, culinary masterclasses, and local workshops happening near you.
        </p>
        
        <div className={styles.searchWrapper}>
          <SearchBar />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;