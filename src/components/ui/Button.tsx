import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/helpers';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'gold';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = 'primary', size = 'md', children, ...props },
  ref
) {
  const base = 'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-600 focus:ring-primary',
    secondary: 'bg-white text-primary border border-support-gray hover:bg-support-light focus:ring-primary',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    gold: 'bg-gold text-gray-900 hover:bg-gold-500 focus:ring-gold'
  };
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  return (
    <button ref={ref} className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
});

export default Button;
