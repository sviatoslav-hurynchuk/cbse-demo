import { createContext } from 'react';
import type { useCovidDashboard } from '../hooks/useCovidDashboard';

export type DashboardContextValue = ReturnType<typeof useCovidDashboard>;

export const DashboardContext = createContext<DashboardContextValue | undefined>(undefined);
