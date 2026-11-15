import type { ChartDataItem, ChartType } from '../../../store/slices/dashboardSlice';

export interface EpidemicChartProps {
  title?: string;
  data?: ChartDataItem[];
  chartType?: ChartType;
  onChartTypeChange?: (type: ChartType) => void;
  isLoading?: boolean;
}
