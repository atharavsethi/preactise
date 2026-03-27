'use client';

import React, { useEffect, useRef, useState } from 'react';

export const SplitText = ({ text, delayOffset = 0 }: { text: string; delayOffset?: number }) => {
  return (
    <span style={{ display: 'inline-block' }}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="split-text-char"
          style={{ animationDelay: `${delayOffset + index * 0.03}s` }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
};

export const BlurText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  return (
    <span
      className="blur-text"
      style={{ display: 'inline-block', animationDelay: `${delay}s` }}
    >
      {text}
    </span>
  );
};

export const ScrollReveal = ({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`fade-in-up ${isVisible ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
};
