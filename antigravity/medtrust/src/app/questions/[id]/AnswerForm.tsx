'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';

export default function AnswerForm({ questionId }: { questionId: string }) {
  const [content, setContent] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/answers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ questionId, content })
    });
    if (res.ok) {
      setSubmitted(true);
      setContent('');
    } else {
      alert('Failed to submit answer. Please ensure you are logged in as a verified doctor.');
    }
  };

  if (submitted) {
    return (
      <GlassCard style={{ border: '1px solid var(--accent-teal)', textAlign: 'center' }}>
        <h3 style={{ color: 'var(--accent-teal)', marginBottom: '0.5rem' }}>Answer Submitted!</h3>
        <p style={{ color: 'var(--text-muted)' }}>Your response has been sent to our moderation queue. It will be published shortly once verified by admins.</p>
        <Button variant="outline" onClick={() => setSubmitted(false)} style={{ marginTop: '1.5rem' }}>Write another answer</Button>
      </GlassCard>
    );
  }

  return (
    <GlassCard>
      <h3 style={{ color: 'var(--text-white)', marginBottom: '1rem' }}>Submit a Verified Answer</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Write your professional medical guidance here..."
          style={{ width: '100%', minHeight: '150px', padding: '1rem', borderRadius: '8px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontFamily: 'inherit' }}
          required
        />
        <Button type="submit" variant="primary">Submit for Moderation</Button>
      </form>
    </GlassCard>
  );
}
