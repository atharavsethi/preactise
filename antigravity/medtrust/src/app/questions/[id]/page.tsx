import React from 'react';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { GlassCard } from '@/components/ui/GlassCard';
import { VerifiedBadge } from '@/components/icons/VerifiedBadge';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import AnswerForm from './AnswerForm';
import UpvoteButton from '@/components/ui/UpvoteButton';
import NearbyHospitals from '@/components/ui/NearbyHospitals';

export default async function QuestionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const session = await getServerSession(authOptions);
  
  const question = await prisma.question.findUnique({
    where: { id: resolvedParams.id },
    include: {
      author: { select: { name: true } },
      answers: { 
        where: { isModerated: true }, 
        include: { author: { select: { name: true, role: true } } },
        orderBy: { upvotes: 'desc' }
      }
    }
  });

  if (!question) return notFound();

  const userRole = (session?.user as any)?.role;
  const canAnswer = userRole === 'DOCTOR' || userRole === 'STUDENT' || userRole === 'ADMIN';

  return (
    <div className="container" style={{ paddingTop: '100px', paddingBottom: '80px', minHeight: '100vh', maxWidth: '800px' }}>
      <GlassCard style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <span style={{ background: 'rgba(0,191,255,0.15)', color: 'var(--accent-cyan)', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600 }}>
            {question.category}
          </span>
        </div>
        <h1 style={{ color: 'var(--text-white)', marginBottom: '1rem' }}>{question.title}</h1>
        <p style={{ color: 'var(--text-white)', fontSize: '1.05rem', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
          {question.description}
        </p>
        <div style={{ marginTop: '2rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.4)', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
          Asked by {question.author.name} on {question.createdAt.toLocaleDateString()}
        </div>
      </GlassCard>

      <h3 style={{ marginBottom: '1.5rem', color: 'var(--accent-teal)' }}>
        {question.answers.length} Verified Answers
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
        {question.answers.length === 0 ? (
          <p style={{ color: 'var(--text-muted)' }}>No verified answers yet. Our medical professionals will respond shortly.</p>
        ) : question.answers.map(ans => (
          <GlassCard key={ans.id} style={{ border: '1px solid rgba(0,255,204,0.3)', background: 'rgba(17,34,64,0.8)' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', gap: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1rem' }}>
              <strong style={{ color: 'var(--text-white)', fontSize: '1.15rem' }}>{ans.author.name}</strong>
              <VerifiedBadge type={ans.author.role === 'DOCTOR' ? 'doctor' : 'student'} />
            </div>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
              {ans.content}
            </p>
            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <UpvoteButton answerId={ans.id} initialUpvotes={ans.upvotes} />
               <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.3)' }}>{ans.createdAt.toLocaleDateString()}</span>
            </div>
          </GlassCard>
        ))}
      </div>

      {canAnswer ? (
         <AnswerForm questionId={question.id} />
      ) : (
         <GlassCard style={{ textAlign: 'center', background: 'rgba(17,34,64,0.4)', borderStyle: 'dashed' }}>
            <p style={{ color: 'var(--text-muted)' }}>Are you a verified medical professional?</p>
            <p style={{ color: 'var(--accent-cyan)', fontSize: '0.95rem', marginTop: '0.5rem' }}>Login to your doctor account to post an answer.</p>
         </GlassCard>
      )}

      {question.answers.length > 0 && <NearbyHospitals />}
    </div>
  );
}
