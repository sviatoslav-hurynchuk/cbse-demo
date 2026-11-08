import type { ReactNode } from 'react';
import { Outlet } from 'react-router';
import { Header } from './Header';

export interface DashboardLayoutProps {
  title?: string;
  subtitle?: string;
  children?: ReactNode;
}

export const DashboardLayout = ({
  title = 'disease.sh dashboard',
  subtitle = 'Lab04',
  children,
}: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col transition-colors duration-200">
      <Header title={title} subtitle={subtitle} />
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8 space-y-6">
        {children ?? <Outlet />}
      </main>
    </div>
  );
};
