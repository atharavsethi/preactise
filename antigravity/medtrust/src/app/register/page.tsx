'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { ScrollReveal } from '@/components/animations';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', role: 'USER', credentialUrl: ''
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    if (res.ok) {
      router.push('/login');
    } else {
      alert('Registration failed. Email might already be in use.');
    }
  };

  return (
    <div className="container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '80px', paddingBottom: '80px' }}>
      <ScrollReveal>
        <GlassCard style={{ maxWidth: '500px', width: '100%', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'var(--accent-teal)' }}>Join MedTrust</h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} style={inputStyle} required />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} style={inputStyle} required />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Password</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} style={inputStyle} required />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>I am a...</label>
              <select name="role" value={formData.role} onChange={handleChange} style={inputStyle}>
                <option value="USER">General User (Seeking Answers)</option>
                <option value="STUDENT">Medical Student (Verification Required)</option>
                <option value="DOCTOR">Verified Doctor (Verification Required)</option>
              </select>
            </div>

            {['STUDENT', 'DOCTOR'].includes(formData.role) && (
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Credential Proof (URL or ID Number)</label>
                <input type="text" name="credentialUrl" value={formData.credentialUrl} onChange={handleChange} style={inputStyle} placeholder="Link to medical license or ID" required />
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>An admin will manually verify your credentials before you can post answers.</p>
              </div>
            )}

            <Button type="submit" variant="primary" style={{ marginTop: '1rem', width: '100%' }}>Create Account</Button>
          </form>
          <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Already have an account? <Link href="/login">Sign in here</Link>
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
  color: 'white'
};
