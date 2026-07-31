import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          Event<span>Nova</span>
        </Link>
        
        <div className={`${styles.navLinks} ${isOpen ? styles.active : ''}`}>
          <NavLink to="/" className={({ isActive }) => isActive ? styles.activeLink : ''} onClick={() => setIsOpen(false)}>Home</NavLink>
          <NavLink to="/events" className={({ isActive }) => isActive ? styles.activeLink : ''} onClick={() => setIsOpen(false)}>Events</NavLink>
          <NavLink to="/categories" className={({ isActive }) => isActive ? styles.activeLink : ''} onClick={() => setIsOpen(false)}>Categories</NavLink>
          <NavLink to="/my-bookings" className={({ isActive }) => isActive ? styles.activeLink : ''} onClick={() => setIsOpen(false)}>My Bookings</NavLink>
        </div>

        <div className={styles.hamburger} onClick={toggleMenu}>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;