import type { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
}

const variantStyles: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed',
  secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed',
  outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 bg-white disabled:opacity-50 disabled:cursor-not-allowed',
};

export const Button = ({
                         children,
                         variant = 'primary',
                         className = '',
                         ...props
                       }: ButtonProps) => {
  return (
      <button
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition cursor-pointer ${variantStyles[variant]} ${className}`}
          {...props}
      >
        {children}
      </button>
  );
};