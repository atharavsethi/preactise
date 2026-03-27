'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { ScrollReveal } from '@/components/animations';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn('credentials', { email, password, callbackUrl: '/' });
  };

  return (
    <div className="container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '80px', paddingBottom: '80px' }}>
      <ScrollReveal>
        <GlassCard style={{ maxWidth: '400px', width: '100%', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'var(--accent-cyan)' }}>Welcome Back</h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Email</label>
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={inputStyle} 
                required 
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Password</label>
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={inputStyle} 
                required 
              />
            </div>
            <Button type="submit" variant="primary" style={{ marginTop: '1rem', width: '100%' }}>Sign In</Button>
            <Button type="button" variant="outline" onClick={() => signIn('google', { callbackUrl: '/' })} style={{ width: '100%' }}>
              Sign In with Google
            </Button>
          </form>
          <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Don't have an account? <Link href="/register">Register here</Link>
          </p>
        </GlassCard>
      </ScrollReveal>
    </div>
  );
}

const inputStyle = {
  width: '100%', 
  padding: '0.75rem', 
  borderRadius: '8px', 
  background: 'rgba(0,0,0,0.2)', 
  border: '1px solid rgba(255,255,255,0.1)', 
  color: 'var(--text-white)'
};
