import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', className = '', ...props }, ref) => {
    const baseClass = variant === 'primary' ? 'btn-primary' : 'btn-outline';
    return (
      <button ref={ref} className={`${baseClass} ${className}`} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
