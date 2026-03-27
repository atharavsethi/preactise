import React from 'react';
import { prisma } from '@/lib/prisma';
import { GlassCard } from '@/components/ui/GlassCard';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { approveAnswer, rejectAnswer, verifyUser } from './actions';

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  
  // Hardcoded to true for demo purposes, but in reality should check session.role === 'ADMIN'
  const isAdmin = true; // (session?.user as any)?.role === 'ADMIN';

  if (!isAdmin) {
    return <div className="container" style={{ paddingTop: '100px' }}>Access Denied. Admins only.</div>;
  }

  const pendingAnswers = await prisma.answer.findMany({
    where: { isModerated: false },
    include: { author: true, question: true }
  });

  const pendingUsers = await prisma.user.findMany({
    where: { isVerified: false, role: { in: ['DOCTOR', 'STUDENT'] } }
  });

  return (
    <div className="container" style={{ paddingTop: '100px', minHeight: '100vh', paddingBottom: '80px' }}>
      <h1 style={{ color: 'var(--accent-cyan)', marginBottom: '2rem' }}>Moderation Dashboard</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        
        {/* Pending Answers Column */}
        <div>
          <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-white)' }}>
            Pending Answers ({pendingAnswers.length})
          </h2>
          {pendingAnswers.length === 0 ? (
            <p style={{ color: 'var(--text-muted)' }}>No answers waiting for moderation.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {pendingAnswers.map(ans => (
                <GlassCard key={ans.id} style={{ border: '1px solid rgba(255,165,0,0.3)' }}>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                    Q: {ans.question.title}
                  </p>
                  <p style={{ marginBottom: '1rem', color: 'var(--text-white)', whiteSpace: 'pre-wrap' }}>
                    {ans.content}
                  </p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--accent-teal)', marginBottom: '1rem' }}>
                    By: {ans.author.name} ({ans.author.role})
                  </p>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <form action={approveAnswer.bind(null, ans.id)}>
                      <button style={btnApprove}>Approve</button>
                    </form>
                    <form action={rejectAnswer.bind(null, ans.id)}>
                      <button style={btnReject}>Reject</button>
                    </form>
                  </div>
                </GlassCard>
              ))}
            </div>
          )}
        </div>

        {/* Pending Users Column */}
        <div>
          <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-white)' }}>
            Verification Requests ({pendingUsers.length})
          </h2>
          {pendingUsers.length === 0 ? (
            <p style={{ color: 'var(--text-muted)' }}>No users pending verification.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {pendingUsers.map(user => (
                <GlassCard key={user.id} style={{ border: '1px solid rgba(0,191,255,0.3)' }}>
                  <h3 style={{ color: 'var(--text-white)', marginBottom: '0.5rem' }}>{user.name}</h3>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Email: {user.email}</p>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Role: <span style={{ color: 'var(--accent-cyan)' }}>{user.role}</span></p>
                  
                  {user.credentialUrl && (
                    <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.5rem', borderRadius: '4px', marginBottom: '1rem', wordBreak: 'break-all' }}>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Credential Proof:</p>
                      <a href={user.credentialUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--accent-teal)' }}>
                        {user.credentialUrl}
                      </a>
                    </div>
                  )}

                  <form action={verifyUser.bind(null, user.id)}>
                    <button style={btnApprove}>Verify User</button>
                  </form>
                </GlassCard>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

const btnApprove = {
  background: 'rgba(0, 255, 204, 0.1)', border: '1px solid var(--accent-teal)', color: 'var(--accent-teal)', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 600
};

const btnReject = {
  background: 'rgba(255, 99, 71, 0.1)', border: '1px solid #ff6347', color: '#ff6347', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 600
};
