import type { Continent, CountryEpidemicStat } from '../../../types/dashboard';

export interface FilteredListProps {
  title?: string;
  countries: CountryEpidemicStat[];
  continents: Continent[];
}

export interface CountryTableProps {
  countries: CountryEpidemicStat[];
}

export interface FilterToolbarProps {
  title: string;
  totalLoaded: number;
  continents: Continent[];
  selectedContinent: string;
  onContinentChange: (continent: string) => void;
}
