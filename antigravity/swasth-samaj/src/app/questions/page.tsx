import React from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default async function QuestionsFeedPage({ searchParams }: { searchParams: { category?: string } }) {
  const resolvedParams = await Promise.resolve(searchParams);
  const category = resolvedParams?.category;
  
  // Fetch from Django Backend
  let questions = [];
  try {
    const res = await fetch('http://localhost:8000/api/forum/questions/', { cache: 'no-store' });
    if (res.ok) {
      questions = await res.json();
    }
  } catch (e) {
    console.error("Failed to fetch questions from Django:", e);
  }

  // Filter by category
  if (category && category !== 'All') {
    questions = questions.filter((q: any) => q.category === category);
  }

  const categories = [
    'All', 'General Medicine', 'Nutrition & Diet', 'Mental Health', 'Pediatrics', 
    'Cardiology', 'Dermatology', 'Women\'s Health', 'Emergency & First Aid', 
    'Dental', 'Other'
  ];

  return (
    <div className={`container ${styles.questionsContainer}`}>
      <div className={styles.header}>
        <h1 className={styles.title}>Medical Questions Feed</h1>
        <Link href="/ask" className="btn btn-primary">
          Ask a Question
        </Link>
      </div>
      
      <div className={styles.categoriesWrapper}>
        {categories.map(c => {
           const isActive = category === c || (!category && c === 'All');
           return (
             <Link 
               key={c} 
               href={c === 'All' ? '/questions' : `/questions?category=${encodeURIComponent(c)}`}
               className={`${styles.categoryBadge} ${isActive ? styles.activeCategory : ''}`}
             >
               {c}
             </Link>
           );
        })}
      </div>

      <div className={styles.questionsList}>
        {questions.length === 0 ? (
           <div className={styles.emptyState}>
             <p>No questions found in this category.</p>
           </div>
        ) : questions.map((q: any) => (
           <Link href={`/questions/${q.id}`} key={q.id}>
             <div className="card">
               <div className={styles.cardHeader}>
                 <span className={styles.categoryTag}>
                   {q.category}
                 </span>
                 <span className={`${styles.statusTag} ${q.status === 'ANSWERED' ? styles.statusAnswered : styles.statusPending}`}>
                   {q.status === 'ANSWERED' ? '✅ Answered' : '⏳ Pending'}
                 </span>
               </div>
               
               <h3 className={styles.questionTitle}>{q.title}</h3>
               <p className={styles.questionDesc}>
                 {q.content?.substring(0, 150)}...
               </p>
               
               <div className={styles.cardFooter}>
                 <span className={styles.authorName}>Asked by {q.author?.name || 'Anonymous'}</span>
                 <span className={styles.answersCount}>
                   <strong>{q.answers?.length || 0}</strong> Verified Answers
                 </span>
               </div>
             </div>
           </Link>
        ))}
       </div>
    </div>
  );
}
