'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './hospitals.module.css';

interface Hospital {
  id: string;
  name: string;
  lat: number;
  lon: number;
  tags: Record<string, string>;
  distance: number;
  rating?: number;
}

export default function NearbyHospitals() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const mapRef = useRef<any>(null);
  const mapInstance = useRef<any>(null);
  const markersRef = useRef<any>({});

  // 1. Ask for location permission
  useEffect(() => {
    requestLocation();
  }, []);

  const requestLocation = () => {
    setLoading(true);
    setError(null);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({ lat: position.coords.latitude, lon: position.coords.longitude });
          fetchNearbyHospitals(position.coords.latitude, position.coords.longitude);
        },
        (err) => {
          console.error(err);
          setError('Location permission denied or unavailable. Please enable location services to find nearby hospitals.');
          setLoading(false);
        },
        { timeout: 10000 }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
      setLoading(false);
    }
  };

  // 2. Fetch from Overpass API
  const fetchNearbyHospitals = async (lat: number, lon: number) => {
    setLoading(true);
    try {
      // 10km radius
      const query = `
        [out:json][timeout:25];
        (
          node["amenity"="hospital"](around:10000, ${lat}, ${lon});
          node["amenity"="clinic"](around:10000, ${lat}, ${lon});
          way["amenity"="hospital"](around:10000, ${lat}, ${lon});
          relation["amenity"="hospital"](around:10000, ${lat}, ${lon});
        );
        out center;
      `;
      const response = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: query
      });
      const data = await response.json();
      
      const parsedHospitals: Hospital[] = data.elements.map((el: any) => {
        const elLat = el.lat || el.center?.lat;
        const elLon = el.lon || el.center?.lon;
        const name = el.tags?.name || 'Unknown Facility';
        return {
          id: el.id.toString(),
          name,
          lat: elLat,
          lon: elLon,
          tags: el.tags || {},
          distance: calculateDistance(lat, lon, elLat, elLon),
        };
      }).filter((h: Hospital) => h.name !== 'Unknown Facility' && h.lat && h.lon);

      // Sort by distance
      parsedHospitals.sort((a, b) => a.distance - b.distance);
      
      setHospitals(parsedHospitals);
      fetchRatings(parsedHospitals);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch hospital data.');
    } finally {
      setLoading(false);
    }
  };

  // Haversine formula
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // 3. Fetch custom ratings backend
  const fetchRatings = async (facilities: Hospital[]) => {
    if (facilities.length === 0) return;
    const ids = facilities.map(f => f.id).join(',');
    try {
      const res = await fetch(`/api/hospitals/ratings?ids=${ids}`);
      const ratingsData = await res.json();
      setHospitals(prev => prev.map(h => ({
        ...h,
        rating: ratingsData[h.id] || 0
      })));
    } catch (e) {
      console.error('Failed to fetch ratings', e);
    }
  };

  // Initialize Map dynamically
  useEffect(() => {
    if (!userLocation || !mapRef.current) return;

    const initMap = () => {
      const L = (window as any).L;
      if (!L) return;

      if (mapInstance.current) {
        mapInstance.current.remove();
      }

      // Initialize map
      const map = L.map(mapRef.current).setView([userLocation.lat, userLocation.lon], 13);
      mapInstance.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      // User marker
      L.marker([userLocation.lat, userLocation.lon], {
        icon: L.icon({
          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        })
      }).addTo(map).bindPopup('<b>You are here</b>');
      
      renderMarkers(hospitals, map);
    };

    if (typeof window !== 'undefined' && !(window as any).L) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);

      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = () => initMap();
      document.head.appendChild(script);
    } else {
      initMap();
    }
  }, [userLocation]);

  // Update markers when hospitals change
  useEffect(() => {
    if (mapInstance.current && hospitals.length > 0) {
      renderMarkers(hospitals, mapInstance.current);
    }
  }, [hospitals]);

  const renderMarkers = (hospitalData: Hospital[], mapFn: any) => {
    const L = (window as any).L;
    if (!L) return;

    // Clear old markers
    Object.values(markersRef.current).forEach((m: any) => m.remove());
    markersRef.current = {};

    hospitalData.forEach(h => {
      const marker = L.marker([h.lat, h.lon], {
        icon: L.icon({
          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        })
      }).addTo(mapFn).bindPopup(`<b>${h.name}</b><br/>${h.distance.toFixed(1)} km away`);
      
      marker.on('click', () => {
        setSelectedId(h.id);
      });

      markersRef.current[h.id] = marker;
    });
  };

  const [sortBy, setSortBy] = useState<'distance' | 'rating'>('distance');
  const [specializationFilter, setSpecializationFilter] = useState<string>('All');
  const [specializations, setSpecializations] = useState<string[]>(['All']);

  // Extract unique specializations
  useEffect(() => {
    if (hospitals.length > 0) {
      const specs = new Set<string>();
      hospitals.forEach(h => {
        if (h.tags['healthcare:speciality']) {
          specs.add(h.tags['healthcare:speciality']);
        }
      });
      setSpecializations(['All', ...Array.from(specs)]);
    }
  }, [hospitals]);

  // Derived filtered & sorted list
  const displayHospitals = React.useMemo(() => {
    let result = [...hospitals];

    // Filter
    if (specializationFilter !== 'All') {
      result = result.filter(h => h.tags['healthcare:speciality'] === specializationFilter);
    }

    // Sort
    if (sortBy === 'distance') {
      result.sort((a, b) => a.distance - b.distance);
    } else {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return result;
  }, [hospitals, sortBy, specializationFilter]);

  const handleFocusHospital = (h: Hospital) => {
    setSelectedId(h.id);
    if (mapInstance.current) {
      mapInstance.current.flyTo([h.lat, h.lon], 16, { animate: true });
      if (markersRef.current[h.id]) {
        markersRef.current[h.id].openPopup();
      }
    }
  };

  const rateHospital = async (id: string, rating: number) => {
    try {
      const res = await fetch('/api/hospitals/ratings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, rating })
      });
      const data = await res.json();
      if (data.success) {
        setHospitals(prev => prev.map(h => 
          h.id === id ? { ...h, rating: data.newAverage } : h
        ));
      }
    } catch (e) {
      console.error(e);
      alert('Failed to submit rating.');
    }
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Nearby Hospitals</h1>
        <div className={styles.headerActions}>
           <button 
             className={styles.nearestBtn}
             onClick={() => {
               if (displayHospitals.length > 0) handleFocusHospital(displayHospitals[0]);
             }}
           >
             Find Nearest Hospital
           </button>
        </div>
      </header>

      {/* Filter and Sort Toolbar */}
      <div style={{ padding: '0.75rem 2rem', background: '#f1f5f9', borderBottom: '1px solid #e2e8f0', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#475569' }}>Filter:</label>
          <select 
            value={specializationFilter} 
            onChange={(e) => setSpecializationFilter(e.target.value)}
            style={{ padding: '0.4rem', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
          >
            {specializations.map(spec => (
              <option key={spec} value={spec}>{spec}</option>
            ))}
          </select>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#475569' }}>Sort by:</label>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value as 'distance' | 'rating')}
            style={{ padding: '0.4rem', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
          >
            <option value="distance">Distance (Nearest first)</option>
            <option value="rating">Rating (Highest first)</option>
          </select>
        </div>
      </div>

      <div className={styles.splitLayout}>
        {/* Left Side: List */}
        <div className={styles.listPanel}>
          {loading && !hospitals.length && (
            <div className={styles.loadingState}>
              <div className={styles.spinner}></div>
              <p>Locating hospitals near you...</p>
            </div>
          )}
          
          {error && (
            <div className={styles.errorState}>
              <p>{error}</p>
              <button className={styles.retryBtn} onClick={requestLocation}>Try Again</button>
            </div>
          )}

          {!loading && !error && hospitals.length === 0 && (
            <div className={styles.errorState}>
              <p>No hospitals found in a 10km radius.</p>
            </div>
          )}

          {!loading && !error && hospitals.length > 0 && displayHospitals.length === 0 && (
            <div className={styles.errorState}>
              <p>No hospitals match the selected filter.</p>
            </div>
          )}

          {displayHospitals.map(h => (
            <div 
              key={h.id} 
              className={`${styles.hospitalCard} ${selectedId === h.id ? styles.active : ''}`}
              onClick={() => handleFocusHospital(h)}
            >
              <div className={styles.cardHeader}>
                <h3 className={styles.hName}>{h.name}</h3>
                <span className={styles.distance}>{h.distance.toFixed(1)} km</span>
              </div>
              <p className={styles.hAddress}>
                {h.tags['addr:street'] ? `${h.tags['addr:street']}, ` : ''} 
                {h.tags['addr:city'] || 'Location mapped'}
              </p>
              
              <div className={styles.hStats}>
                {h.tags.emergency === 'yes' && <span className={styles.statBadge}>Emergency Services</span>}
                {h.tags['healthcare:speciality'] && <span className={styles.statBadge}>{h.tags['healthcare:speciality']}</span>}
              </div>

              <div className={styles.ratingSection}>
                <div 
                  className={styles.ratingDisplay} 
                  title="Average rating from users"
                >
                  ⭐ {h.rating ? h.rating.toFixed(1) : 'New'} 
                  <span className={styles.ratingCount}>/ 5</span>
                </div>
                
                <div className={styles.rateActions} title="Rate this hospital" onClick={(e) => e.stopPropagation()}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <button 
                      key={star}
                      className={styles.starBtn}
                      onClick={(e) => { rateHospital(h.id, star); }}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Map */}
        <div className={styles.mapPanel}>
          {userLocation ? (
             <div ref={mapRef} className={styles.mapContainer}></div>
          ) : (
             <div className={styles.loadingState}>
               <p>Map will appear once location is determined.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
