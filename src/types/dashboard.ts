// Типи даних для предметної області: Епідемстатистика (disease.sh)

export type MetricType = 'cases' | 'recovered' | 'deaths' | 'active';

export interface EpidemicKpi {
  id: string;
  title: string;
  value: number | string;
  change: string; // приріст за сьогодні (наприклад, "+1,240 сьогодні")
  type: MetricType;
  isPositive?: boolean; // для одужань зростання - це плюс, для смертей/випадків - мінус
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
