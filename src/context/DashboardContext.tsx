import type { ReactNode } from 'react';
import { useCovidDashboard } from '../hooks/useCovidDashboard';
import { DashboardContext } from './DashboardContextDefinition';

export function DashboardProvider({ children }: { children: ReactNode }) {
  const dashboard = useCovidDashboard();

  return (
    <DashboardContext.Provider value={dashboard}>
      {children}
    </DashboardContext.Provider>
  );
}
