import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <h3>Event<span>Nova</span></h3>
          <p>Discover and book the best events happening around you.</p>
        </div>
        <div className={styles.links}>
          <h4>Quick Links</h4>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/faq">FAQ</Link>
        </div>
        <div className={styles.social}>
          <h4>Follow Us</h4>
          <p>Modern UI. Built with React.</p>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>&copy; 2026 EventNova. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;