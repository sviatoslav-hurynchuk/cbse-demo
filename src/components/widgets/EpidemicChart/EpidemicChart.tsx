import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import type { EpidemicChartProps } from './types';
import type { ChartType } from '../../../store/slices/dashboardSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  selectChartData,
  selectChartType,
  selectIsLoading,
  setChartType,
} from '../../../store/slices/dashboardSlice';

const formatYAxis = (val: number): string => {
  if (val >= 1_000_000) {
    return `${(val / 1_000_000).toFixed(1)}M`;
  }
  if (val >= 1_000) {
    return `${(val / 1_000).toFixed(0)}k`;
  }
  return val.toString();
};

export const EpidemicChart = ({
  title = 'Порівняльний аналіз (Топ-10 країн вибірки)',
  data: propData,
  chartType: propChartType,
  onChartTypeChange: propOnChartTypeChange,
  isLoading: propIsLoading,
}: Partial<EpidemicChartProps> = {}) => {
  const dispatch = useAppDispatch();

  const reduxData = useAppSelector(selectChartData);
  const reduxChartType = useAppSelector(selectChartType);
  const reduxIsLoading = useAppSelector(selectIsLoading);
  const isDark = useAppSelector((state) => state.theme.theme === 'dark');

  const data = propData ?? reduxData;
  const currentChartType = propChartType ?? reduxChartType;
  const isLoading = propIsLoading ?? reduxIsLoading;

  const handleChartTypeChange = (type: ChartType) => {
    if (propOnChartTypeChange) {
      propOnChartTypeChange(type);
    } else {
      dispatch(setChartType(type));
    }
  };

  const gridColor = isDark ? '#374151' : '#e5e7eb';
  const tickColor = isDark ? '#9ca3af' : '#6b7280';

  return (
    <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xs space-y-4 transition-colors">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-gray-100 dark:border-gray-800 pb-3">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-base">{title}</h3>
        </div>

        <div className="flex items-center gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg shrink-0">
          <button
            type="button"
            onClick={() => handleChartTypeChange('grouped')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
              currentChartType === 'grouped'
                ? 'bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-xs font-semibold'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            Grouped
          </button>
          <button
            type="button"
            onClick={() => handleChartTypeChange('stacked')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
              currentChartType === 'stacked'
                ? 'bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-xs font-semibold'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            Stacked
          </button>
        </div>
      </div>

      {isLoading && (
        <div className="h-80 flex flex-col items-center justify-center gap-3 text-gray-500 dark:text-gray-400">
          <div className="w-8 h-8 border-3 border-blue-600 dark:border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium">Оновлення графічних показників...</p>
        </div>
      )}

      {!isLoading && data.length === 0 && (
        <div className="h-80 flex items-center justify-center text-gray-400 dark:text-gray-500 text-sm">
          Немає даних для побудови графіка за вибраними фільтрами
        </div>
      )}

      {!isLoading && data.length > 0 && (
        <div className="w-full h-80 pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 25 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} opacity={0.6} />
              <XAxis
                dataKey="name"
                tick={{ fill: tickColor, fontSize: 11 }}
                angle={-20}
                textAnchor="end"
                height={45}
              />
              <YAxis
                tick={{ fill: tickColor, fontSize: 11 }}
                tickFormatter={formatYAxis}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? '#111827' : '#ffffff',
                  borderColor: isDark ? '#374151' : '#e5e7eb',
                  borderRadius: '0.5rem',
                  color: isDark ? '#f3f4f6' : '#111827',
                  fontSize: '0.875rem',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
                itemStyle={{ color: isDark ? '#f3f4f6' : '#111827' }}
                formatter={(value: unknown, name: unknown) => [
                  typeof value === 'number' ? value.toLocaleString() : String(value ?? ''),
                  String(name ?? ''),
                ]}
              />
              <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '12px' }} />

              {currentChartType === 'grouped' ? (
                <>
                  <Bar
                    dataKey="cases"
                    name="Усього випадків"
                    fill="#3b82f6"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="recovered"
                    name="Одужало"
                    fill="#10b981"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="deaths"
                    name="Смерті"
                    fill="#ef4444"
                    radius={[4, 4, 0, 0]}
                  />
                </>
              ) : (
                <>
                  <Bar
                    dataKey="recovered"
                    name="Одужало"
                    stackId="epidemic"
                    fill="#10b981"
                  />
                  <Bar
                    dataKey="active"
                    name="Активні"
                    stackId="epidemic"
                    fill="#6366f1"
                  />
                  <Bar
                    dataKey="deaths"
                    name="Смерті"
                    stackId="epidemic"
                    fill="#ef4444"
                    radius={[4, 4, 0, 0]}
                  />
                </>
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};
