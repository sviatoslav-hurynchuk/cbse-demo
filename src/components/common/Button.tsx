import type { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
}

export const Button = ({
  children,
  variant = 'primary',
  className = '',
  ...props
}: ButtonProps) => {
  // Базовий каркас кнопки
  return (
    <button
      className={`px-4 py-2 rounded-lg font-medium transition cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
