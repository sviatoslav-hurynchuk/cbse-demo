import type { Continent, CountryEpidemicStat } from '../../../types/dashboard';

export interface FilteredListProps {
  title?: string;
  countries: CountryEpidemicStat[];
  continents: Continent[];
}
