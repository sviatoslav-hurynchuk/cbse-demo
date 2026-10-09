import type { Continent, CountryEpidemicStat } from '../../../types/dashboard';

export type SortField = 'country' | 'cases' | 'deaths' | 'recovered';
export type SortDirection = 'asc' | 'desc';

export interface FilteredListProps {
  title?: string;
  countries?: CountryEpidemicStat[];
  continents?: Continent[];
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
