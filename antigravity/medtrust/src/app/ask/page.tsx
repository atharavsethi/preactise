'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { ScrollReveal } from '@/components/animations';

export default function AskQuestionPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({ title: '', description: '', category: 'General Medicine' });

  if (status === 'loading') return <div className="container" style={{ paddingTop: '100px' }}>Loading...</div>;
  if (status === 'unauthenticated') {
    router.push('/login');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    if (res.ok) {
      router.push('/questions');
    } else {
      alert('Failed to post question');
    }
  };

  const categories = [
    'General Medicine', 'Nutrition & Diet', 'Mental Health', 'Pediatrics', 
    'Cardiology', 'Dermatology', 'Women\'s Health', 'Emergency & First Aid', 
    'Dental', 'Other'
  ];

  return (
    <div className="container" style={{ paddingTop: '100px', paddingBottom: '80px', minHeight: '100vh' }}>
      <ScrollReveal>
        <GlassCard style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ marginBottom: '1.5rem', color: 'var(--accent-cyan)' }}>Ask a Health Question</h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Title</label>
              <input 
                type="text" 
                value={formData.title} 
                onChange={e => setFormData({...formData, title: e.target.value})} 
                style={inputStyle} 
                placeholder="Brief summary of your question"
                required 
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Category</label>
              <select 
                value={formData.category} 
                onChange={e => setFormData({...formData, category: e.target.value})} 
                style={inputStyle}
              >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Detailed Description</label>
              <textarea 
                value={formData.description} 
                onChange={e => setFormData({...formData, description: e.target.value})} 
                style={{ ...inputStyle, minHeight: '150px' }} 
                placeholder="Include relevant details, timeline, etc."
                required 
              />
            </div>
            <Button type="submit" variant="primary" style={{ marginTop: '1rem' }}>Post Question</Button>
          </form>
        </GlassCard>
      </ScrollReveal>
    </div>
  );
}

const inputStyle = {
  width: '100%', padding: '0.75rem', borderRadius: '8px', 
  background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white'
};
