import { Link } from 'react-router-dom';
const NotFound = () => (
  <div style={{ textAlign: 'center', padding: '10rem 2rem' }}>
    <h1 style={{ fontSize: '4rem', color: 'var(--primary-color)' }}>404</h1>
    <h2>Page Not Found</h2>
    <Link to="/" style={{ display: 'inline-block', marginTop: '2rem', padding: '1rem 2rem', background: 'var(--primary-color)', color: 'white', borderRadius: '8px' }}>Go Home</Link>
  </div>
);
export default NotFound;