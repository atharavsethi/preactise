'use client';

import { useState, useEffect } from 'react';
import { Doctor, MOCK_DOCTORS } from './mockData';

export type UserRole = 'PATIENT' | 'DOCTOR' | 'STUDENT' | 'ADMIN';

export interface UserSession {
  name: string;
  role: UserRole;
  avatar?: string;
  isVerified?: boolean;
  college?: string;
  year?: string;
}

export function useMockStore() {
  const [session, setSession] = useState<UserSession | null>(null);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [ratings, setRatings] = useState<Record<string, number>>({});

  useEffect(() => {
    const savedSession = localStorage.getItem('ss_session');
    if (savedSession) setSession(JSON.parse(savedSession));

    const savedRatings = localStorage.getItem('ss_ratings');
    if (savedRatings) setRatings(JSON.parse(savedRatings));

    // Initial mock notifications
    setNotifications([
      { id: 1, text: "Dr. Priya Ramesh replied to your query", time: "2h ago", unread: true },
      { id: 2, text: "Your doctor verification was approved ✅", time: "1d ago", unread: false },
      { id: 3, text: "New message from Dr. Arjun Mehta", time: "3d ago", unread: false }
    ]);
  }, []);

  const login = (user: UserSession) => {
    setSession(user);
    localStorage.setItem('ss_session', JSON.stringify(user));
  };

  const logout = () => {
    setSession(null);
    localStorage.removeItem('ss_session');
  };

  const addRating = (doctorId: string, rating: number) => {
    const newRatings = { ...ratings, [doctorId]: rating };
    setRatings(newRatings);
    localStorage.setItem('ss_ratings', JSON.stringify(newRatings));
  };

  return { session, login, logout, notifications, ratings, addRating };
}
