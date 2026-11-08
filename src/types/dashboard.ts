export type MetricType = 'cases' | 'recovered' | 'deaths' | 'active';

export interface EpidemicKpi {
  id: string;
  title: string;
  value: number | string;
  change: string;
  type: MetricType;
  isPositive?: boolean;
}

export type Continent = 'Всі' | 'Європа' | 'Азія' | 'Північна Америка' | 'Південна Америка' | 'Африка';

export interface CountryEpidemicStat {
  id: string;
  country: string;
  continent: Continent;
  cases: number;
  recovered: number;
  deaths: number;
  flag?: string;
}

export interface CountryDetailStat extends CountryEpidemicStat {
  population: number;
  todayCases: number;
  todayDeaths: number;
  todayRecovered: number;
  active: number;
  critical: number;
  casesPerOneMillion: number;
  deathsPerOneMillion: number;
  tests: number;
  testsPerOneMillion: number;
  iso2?: string;
  iso3?: string;
  lat?: number;
  long?: number;
}
