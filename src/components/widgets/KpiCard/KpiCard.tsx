import type { KpiCardProps } from './types';

export const KpiCard = ({ title, value, change, isPositive, type }: KpiCardProps) => {
  return (
    <div
      data-metric-type={type}
      className="p-5 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 transition-colors"
    >
      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">{title}</h4>
      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">{value}</p>
      <span className={`text-sm font-medium ${isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
        {change}
      </span>
    </div>
  );
};
