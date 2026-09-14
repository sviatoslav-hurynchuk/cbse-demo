import type { ReactNode } from 'react';
import { Header } from './Header';

export interface DashboardLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export const DashboardLayout = ({ title, subtitle, children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      <Header title={title} subtitle={subtitle} />
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8 space-y-6">
        {children}
      </main>
    </div>
  );
};
