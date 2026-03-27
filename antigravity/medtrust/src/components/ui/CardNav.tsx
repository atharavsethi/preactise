'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const CardNav = () => {
  const pathname = usePathname();
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Q&A Feed', path: '/questions' },
    { name: 'Ask Doc', path: '/ask' },
    { name: 'Moderation', path: '/admin' }
  ];

  return (
    <nav style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem',
      position: 'sticky', top: 0, zIndex: 50, 
      background: 'linear-gradient(to bottom, rgba(2, 12, 27, 0.95), transparent)', 
    }}>
      {/* Brand Logo & Name */}
      <Link href="/">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
          <img src="/logo.png" alt="Swasth Samaj Logo" style={{ height: '40px', width: 'auto', borderRadius: '50%', background: 'white', padding: '2px' }} />
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-white)', letterSpacing: '0.5px' }}>
            SWASTH <span style={{ color: 'var(--accent-teal)' }}>SAMAJ</span>
          </span>
        </div>
      </Link>

      {/* Nav Items */}
      <div style={{
        display: 'flex', gap: '0.5rem', background: 'rgba(255,255,255,0.03)',
        padding: '0.5rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(12px)', boxShadow: '0 4px 30px rgba(0,0,0,0.5)'
      }}>
        {navItems.map(item => {
          const isActive = item.path === '/' ? pathname === '/' : pathname.startsWith(item.path);
          return (
            <Link key={item.name} href={item.path}>
              <div style={{
                padding: '0.6rem 1.25rem', borderRadius: '18px', fontWeight: 600, fontSize: '0.9rem',
                background: isActive ? 'var(--accent-teal)' : 'transparent',
                color: isActive ? 'var(--bg-dark)' : 'var(--text-white)',
                transition: 'all 0.3s ease', cursor: 'pointer',
                boxShadow: isActive ? '0 4px 15px rgba(0,255,204,0.3)' : 'none'
              }}>
                {item.name}
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
