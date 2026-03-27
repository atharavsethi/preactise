'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export const BubbleMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  const actions = session ? [
    { label: 'Logout', icon: '🚪', action: () => signOut() },
    { label: 'Admin', icon: '🛡️', path: '/admin' },
    { label: 'Ask', icon: '🩺', path: '/ask' }
  ] : [
    { label: 'Login', icon: '👤', path: '/login' },
    { label: 'Register', icon: '📝', path: '/register' },
  ];

  return (
    <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 100, display: 'flex', flexDirection: 'column-reverse', alignItems: 'flex-end', gap: '1rem' }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-teal), var(--accent-cyan))',
          border: 'none', color: 'var(--bg-dark)', fontSize: '1.8rem', cursor: 'pointer',
          boxShadow: '0 4px 25px rgba(0,255,204,0.4)', transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          transform: isOpen ? 'rotate(135deg)' : 'rotate(0deg)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1
        }}
      >
        +
      </button>

      {isOpen && actions.map((act, idx) => {
        const content = (
          <div style={{
            display: 'flex', alignItems: 'center', gap: '1rem',
            animation: `fade-in-up 0.3s ease forwards`,
            animationDelay: `${idx * 0.05}s`, opacity: 0,
            transform: 'translateY(15px)'
          }}>
            <span style={{ 
              background: 'rgba(17,34,64,0.95)', padding: '0.5rem 1rem', borderRadius: '20px', 
              fontSize: '0.9rem', color: 'white', border: '1px solid rgba(0,255,204,0.2)',
              backdropFilter: 'blur(8px)', fontWeight: 600, boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
            }}>
              {act.label}
            </span>
            <button 
              onClick={act.action ? act.action : undefined}
              style={{
                width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(17,34,64,0.95)',
                border: '1px solid var(--accent-cyan)', color: 'white', fontSize: '1.2rem', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backdropFilter: 'blur(8px)', boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
            }}>
              {act.icon}
            </button>
          </div>
        );

        return act.path ? (
          <Link key={act.label} href={act.path}>{content}</Link>
        ) : (
          <div key={act.label}>{content}</div>
        );
      })}
    </div>
  );
};
