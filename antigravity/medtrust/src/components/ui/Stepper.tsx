'use client';
import React, { useState } from 'react';

export interface Step {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export const Stepper = ({ steps }: { steps: Step[] }) => {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', width: '100%', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
        {/* Background Track */}
        <div style={{ position: 'absolute', top: '24px', left: '10%', right: '10%', height: '2px', background: 'rgba(255,255,255,0.1)', zIndex: 0 }} />
        {/* Active Track */}
        <div style={{ 
          position: 'absolute', top: '24px', left: '10%', height: '2px', background: 'var(--accent-teal)', zIndex: 0, 
          width: `${(currentStep / (steps.length - 1)) * 80}%`, transition: 'width 0.4s ease-out' 
        }} />
        
        {steps.map((step, idx) => (
          <div key={idx} onClick={() => setCurrentStep(idx)} style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', flex: 1 }}>
            <div style={{
              width: '50px', height: '50px', borderRadius: '50%',
              background: idx <= currentStep ? 'var(--accent-teal)' : 'rgba(17,34,64,0.9)',
              color: idx <= currentStep ? 'var(--bg-dark)' : 'var(--text-muted)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 'bold', fontSize: '1.2rem',
              border: `2px solid ${idx <= currentStep ? 'var(--accent-teal)' : 'rgba(255,255,255,0.2)'}`,
              transition: 'all 0.4s ease',
              boxShadow: idx === currentStep ? '0 0 20px rgba(0,255,204,0.4)' : 'none'
            }}>
              {step.icon || idx + 1}
            </div>
            <h4 style={{ 
              marginTop: '1rem', 
              color: idx === currentStep ? 'var(--accent-cyan)' : 'var(--text-muted)', 
              transition: 'color 0.3s ease', 
              textAlign: 'center',
              fontWeight: idx === currentStep ? 700 : 500
            }}>
              {step.title}
            </h4>
          </div>
        ))}
      </div>
      
      <div style={{ 
        background: 'rgba(17,34,64,0.6)', padding: '2.5rem', borderRadius: '16px', 
        border: '1px solid rgba(255,255,255,0.05)', minHeight: '150px', 
        backdropFilter: 'blur(10px)', textAlign: 'center',
        animation: 'fade-in-up 0.4s ease forwards'
      }} key={currentStep}>
        <h3 style={{ color: 'var(--text-white)', marginBottom: '1rem', fontSize: '1.5rem' }}>{steps[currentStep].title}</h3>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '1.1rem' }}>{steps[currentStep].description}</p>
      </div>
    </div>
  );
};
