import React from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import styles from "./question.module.css";
import AnswerForm from "@/components/forum/AnswerForm";
import UpvoteButton from "@/components/ui/UpvoteButton";

export default async function QuestionDetailPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  
  const unwrappedParams = await params;
  const { id } = unwrappedParams;
  
  let question = null;
  try {
    const res = await fetch(`http://localhost:8000/api/forum/questions/${id}/`, { cache: 'no-store' });
    if (res.ok) {
       question = await res.json();
    }
  } catch (e) {
    console.error("Failed to fetch question:", e);
  }

  if (!question) {
    return (
      <div className={`container ${styles.notFound}`}>
        <h1>Question Not Found</h1>
        <p>This medical query may have been removed or securely archived.</p>
        <Link href="/questions" className="btn btn-outline" style={{ marginTop: "1rem" }}>Back to Forum</Link>
      </div>
    );
  }

  return (
    <div className={`container ${styles.detailContainer}`}>
      <Link href="/questions" className={styles.backLink}>&larr; Back to Questions Feed</Link>
      
      <div className={styles.questionCard}>
        <div className={styles.metaRow}>
          <span className={styles.categoryBadge}>{question.category}</span>
          <span className={styles.dateText}>{new Date(question.created_at).toLocaleDateString()}</span>
        </div>
        
        <h1 className={styles.questionTitle}>{question.title}</h1>
        <p className={styles.questionContent}>{question.content}</p>
        
        <div className={styles.authorInfo}>
          <div className={styles.authorAvatar}>
            {question.is_anonymous ? '?' : question.author?.name?.charAt(0) || 'U'}
          </div>
          <div>
            <strong>{question.is_anonymous ? "Anonymous Patient" : question.author?.name}</strong>
            <div style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>
              Identity Protected
            </div>
          </div>
        </div>
      </div>

      <div className={styles.answersSection}>
        <h3 className={styles.answersHeading}>
          Verified Doctor Responses ({question.answers?.length || 0})
        </h3>
        
        {(!question.answers || question.answers.length === 0) && (
          <div className={styles.noAnswers}>
            <p>No verified medical professionals have answered this yet.</p>
            <p style={{ fontSize: "0.9rem", color: "var(--color-saffron)" }}>If this is an emergency, please visit the nearest hospital or use the SOS page.</p>
          </div>
        )}

        {question.answers?.map((ans: any) => (
          <div key={ans.id} className={`${styles.answerCard} ${ans.is_verified ? styles.verifiedAnswer : ''}`}>
            {ans.is_verified && (
              <div className={styles.verificationBadge}>
                ✓ Verified Medical Information
              </div>
            )}
            
            <div className={styles.answerHeader}>
               <div className={styles.doctorInfo}>
                 <div className={styles.doctorAvatar}>Dr</div>
                 <div>
                   <strong style={{ display: 'block', color: 'var(--color-green-dark)' }}>Dr. {ans.author?.name}</strong>
                   <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                     {ans.author?.specialty || 'General Practitioner'} • Verified
                   </span>
                 </div>
               </div>
               
               <UpvoteButton answerId={ans.id} initialUpvotes={ans.upvotes} />
            </div>

            <div className={styles.answerContent}>
              <p>{ans.content}</p>
            </div>
            
            <div className={styles.answerFooter}>
              <span>Answered on {new Date(ans.created_at).toLocaleDateString()}</span>
              {session?.user?.role === 'USER' && (
                 <button className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem', borderRadius: '20px' }}>
                   📞 Consult Privately
                 </button>
              )}
            </div>
          </div>
        ))}

        {session && ['DOCTOR', 'STUDENT'].includes((session.user as any).role) && (
          <div style={{ marginTop: '3rem' }}>
            <h4 style={{ marginBottom: '1rem', color: 'var(--color-heading)' }}>Add Your Professional Input</h4>
            <AnswerForm questionId={question.id} accessToken={(session.user as any).accessToken} />
          </div>
        )}
      </div>
    </div>
  );
}
