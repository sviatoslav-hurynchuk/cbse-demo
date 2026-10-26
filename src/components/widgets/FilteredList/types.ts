import type { Continent, CountryEpidemicStat } from '../../../types/dashboard';

export type SortField = 'country' | 'cases' | 'deaths' | 'recovered';
export type SortDirection = 'asc' | 'desc';

export interface FilteredListProps {
  title?: string;
  countries?: CountryEpidemicStat[];
  continents?: Continent[];
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  selectedContinent?: string;
  onContinentChange?: (continent: string) => void;
  sortField?: SortField;
  sortDirection?: SortDirection;
  onSort?: (field: SortField) => void;
}

export interface CountryTableProps {
  countries: CountryEpidemicStat[];
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
}

export interface FilterToolbarProps {
  title: string;
  totalLoaded: number;
  continents: string[];
  selectedContinent: string;
  onContinentChange: (continent: string) => void;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}
