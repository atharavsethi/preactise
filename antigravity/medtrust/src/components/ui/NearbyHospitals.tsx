'use client';
import React, { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';

export default function NearbyHospitals() {
  const [location, setLocation] = useState<{ lat: number, lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const requestLocation = () => {
    setLoading(true);
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
        setLoading(false);
      },
      () => {
        setError('Failed to retrieve location. Please allow location access.');
        setLoading(false);
      }
    );
  };

  return (
    <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
      <h2 style={{ color: 'var(--accent-cyan)', marginBottom: '1rem' }}>Get In-Person Care</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Need immediate assistance or an in-person consultation? Find trusted facilities near you.</p>
      
      {!location ? (
         <GlassCard style={{ textAlign: 'center', padding: '3rem 2rem' }}>
           <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📍</div>
           <h3 style={{ marginBottom: '1rem', color: 'var(--text-white)' }}>Find Nearby Hospitals</h3>
           <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Allow location access to see the nearest verified clinics and hospitals.</p>
           {error && <p style={{ color: '#ff6347', marginBottom: '1rem' }}>{error}</p>}
           <Button variant="primary" onClick={requestLocation} disabled={loading}>
             {loading ? 'Locating...' : 'Use My Location'}
           </Button>
         </GlassCard>
      ) : (
         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
           {[
             { name: 'City Central Medical Center', dist: '1.2 miles' }, 
             { name: 'Westside Family Clinic', dist: '2.5 miles' },
             { name: 'Downtown Urgent Care', dist: '3.1 miles' }
           ].map((hospital, idx) => (
             <GlassCard key={idx} style={{ border: '1px solid rgba(0,255,204,0.2)' }}>
               <h4 style={{ color: 'var(--text-white)', marginBottom: '0.5rem' }}>{hospital.name}</h4>
               <p style={{ color: 'var(--accent-teal)', fontSize: '0.9rem', marginBottom: '1rem' }}>{hospital.dist} away</p>
               <Button variant="outline" style={{ width: '100%', fontSize: '0.85rem', padding: '0.5rem' }}>Get Directions</Button>
             </GlassCard>
           ))}
         </div>
      )}
    </div>
  );
}
