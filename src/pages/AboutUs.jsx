import React from 'react';
import { Info, Users, Globe, Shield } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="about-container">
      <div className="page-header text-center mb-5">
        <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          About EventNova <Info color="var(--accent)" size={32} />
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', maxWidth: '600px', margin: '0.5rem auto' }}>
          We are dedicated to bringing you the best events, seamlessly bridging the gap between organizers and attendees.
        </p>
      </div>

      <div className="grid-container mb-5">
        <div className="glass-panel text-center p-4">
          <Users size={48} color="var(--primary)" style={{ marginBottom: '1rem' }} />
          <h3>Community First</h3>
          <p style={{ color: 'var(--text-secondary)' }}>
            Our platform is built around fostering vibrant communities and bringing people together through shared experiences.
          </p>
        </div>
        
        <div className="glass-panel text-center p-4">
          <Globe size={48} color="var(--accent)" style={{ marginBottom: '1rem' }} />
          <h3>Global Reach</h3>
          <p style={{ color: 'var(--text-secondary)' }}>
            Discover events not just locally, but globally. We connect you with world-class experiences wherever you are.
          </p>
        </div>
        
        <div className="glass-panel text-center p-4">
          <Shield size={48} color="var(--success)" style={{ marginBottom: '1rem' }} />
          <h3>Secure & Reliable</h3>
          <p style={{ color: 'var(--text-secondary)' }}>
            Your trust is our priority. We ensure secure booking processes and reliable event information.
          </p>
        </div>
      </div>

      <div className="glass-panel p-5 mt-5">
        <h2 className="mb-4 text-center">Our Story</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1.1rem' }}>
          EventNova started with a simple idea: making it easier for people to discover amazing things happening around them. 
          What began as a small project has now grown into a comprehensive platform where event organizers can easily manage 
          and promote their events, and users can find exactly what they're looking for. 
          <br /><br />
          Whether it's a tech conference, a music festival, or a local workshop, EventNova is your gateway to unforgettable experiences.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
