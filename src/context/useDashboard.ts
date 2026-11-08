import { useContext } from 'react';
import { DashboardContext, type DashboardContextValue } from './DashboardContextDefinition';

export function useDashboard(): DashboardContextValue {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}

export function useOptionalDashboard(): DashboardContextValue | undefined {
  return useContext(DashboardContext);
}
