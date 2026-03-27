import React from 'react';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';

export default async function QuestionsFeedPage({ searchParams }: { searchParams: { category?: string } }) {
  const category = searchParams.category;
  
  const questions = await prisma.question.findMany({
    where: category ? { category } : undefined,
    include: {
      author: { select: { name: true } },
      answers: { where: { isModerated: true } }
    },
    orderBy: { createdAt: 'desc' }
  });

  const categories = [
    'All', 'General Medicine', 'Nutrition & Diet', 'Mental Health', 'Pediatrics', 
    'Cardiology', 'Dermatology', 'Women\'s Health', 'Emergency & First Aid', 
    'Dental', 'Other'
  ];

  return (
    <div className="container" style={{ paddingTop: '100px', minHeight: '100vh', paddingBottom: '80px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--accent-cyan)' }}>Medical Questions Feed</h1>
        <Link href="/ask">
          <Button variant="primary">Ask a Question</Button>
        </Link>
      </div>
      
      <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', marginBottom: '2rem', paddingBottom: '1rem' }}>
        {categories.map(c => (
           <Link key={c} href={c === 'All' ? '/questions' : `/questions?category=${encodeURIComponent(c)}`}>
             <span style={{
               padding: '0.5rem 1rem', 
               borderRadius: '20px', 
               background: (category === c || (!category && c === 'All')) ? 'var(--accent-teal)' : 'rgba(255,255,255,0.05)',
               color: (category === c || (!category && c === 'All')) ? 'var(--bg-dark)' : 'var(--text-white)',
               whiteSpace: 'nowrap',
               border: '1px solid var(--accent-teal)'
             }}>
               {c}
             </span>
           </Link>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {questions.length === 0 ? (
           <p style={{ color: 'var(--text-muted)' }}>No questions found in this category.</p>
        ) : questions.map(q => (
           <Link href={`/questions/${q.id}`} key={q.id}>
             <GlassCard className="question-card" style={{ transition: 'transform 0.2s', cursor: 'pointer' }}>
               <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                 <span style={{ background: 'rgba(0,191,255,0.15)', color: 'var(--accent-cyan)', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600 }}>
                   {q.category}
                 </span>
                 <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', display: 'flex', alignItems: 'center' }}>
                   {q.status === 'ANSWERED' ? '✅ Answered' : '⏳ Pending'}
                 </span>
               </div>
               <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-white)', fontSize: '1.3rem' }}>{q.title}</h3>
               <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                 {q.description}
               </p>
               <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-muted)', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
                 <span>Asked by {q.author.name}</span>
                 <span><strong style={{ color: 'var(--accent-teal)' }}>{q.answers.length}</strong> Verified Answers</span>
               </div>
             </GlassCard>
           </Link>
        ))}
      </div>
    </div>
  );
}
