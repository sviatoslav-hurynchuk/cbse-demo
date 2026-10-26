import type { SortDirection, SortField } from '../FilteredList/types';

export interface FilterFormValues {
  search: string;
  continent: string;
  sortBy: SortField;
  sortDirection: SortDirection;
  minCases: number;
}

export interface FilterFormProps {
  values: FilterFormValues;
  continents: string[];
  onChange: <K extends keyof FilterFormValues>(field: K, value: FilterFormValues[K]) => void;
  onReset: () => void;
}
