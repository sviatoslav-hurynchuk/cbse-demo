import type { KpiCardProps } from './types';

export const KpiCard = ({ title, value, change, isPositive, type }: KpiCardProps) => {
  return (
    <div
      data-metric-type={type}
      className="p-5 rounded-xl border border-dashed border-gray-300 bg-white"
    >
      <h4 className="text-sm font-medium text-gray-500 mt-1">{title}</h4>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
      <span className={`text-sm font-medium ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
        {change}
      </span>
    </div>
  );
};
