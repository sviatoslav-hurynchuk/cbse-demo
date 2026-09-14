import type { MetricType } from '../../../types/dashboard';

export interface KpiCardProps {
  title: string;
  value: string | number;
  change: string;
  type?: MetricType;
  isPositive?: boolean;
}
