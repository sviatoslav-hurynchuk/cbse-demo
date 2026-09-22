import type { Continent, CountryEpidemicStat, EpidemicKpi } from '../types/dashboard';

export const mockKpiData: EpidemicKpi[] = [
  {
    id: 'kpi-cases',
    title: 'Усього випадків',
    value: '676,609,955',
    change: '+14,820 сьогодні',
    type: 'cases',
    isPositive: false,
  },
  {
    id: 'kpi-recovered',
    title: 'Усього одужань',
    value: '649,158,432',
    change: '+22,140 сьогодні',
    type: 'recovered',
    isPositive: true,
  },
  {
    id: 'kpi-deaths',
    title: 'Летальні випадки',
    value: '6,881,955',
    change: '+120 сьогодні',
    type: 'deaths',
    isPositive: false,
  },
  {
    id: 'kpi-active',
    title: 'Активні випадки',
    value: '20,569,568',
    change: '-7,440 сьогодні',
    type: 'active',
    isPositive: true,
  },
];

export const mockContinents: Continent[] = [
  'Всі',
  'Європа',
  'Азія',
  'Північна Америка',
  'Південна Америка',
  'Африка',
];

export const mockCountriesData: CountryEpidemicStat[] = [
  {
    id: 'UA',
    country: 'Україна',
    continent: 'Європа',
    cases: 5557995,
    recovered: 5440279,
    deaths: 112419,
    flag: '🇺🇦',
  },
  {
    id: 'PL',
    country: 'Польща',
    continent: 'Європа',
    cases: 6516200,
    recovered: 6390100,
    deaths: 119500,
    flag: '🇵🇱',
  },
  {
    id: 'DE',
    country: 'Німеччина',
    continent: 'Європа',
    cases: 38437700,
    recovered: 38240000,
    deaths: 174900,
    flag: '🇩🇪',
  },
  {
    id: 'US',
    country: 'США',
    continent: 'Північна Америка',
    cases: 103436829,
    recovered: 101254300,
    deaths: 1127152,
    flag: '🇺🇸',
  },
  {
    id: 'JP',
    country: 'Японія',
    continent: 'Азія',
    cases: 33803572,
    recovered: 33500000,
    deaths: 74694,
    flag: '🇯🇵',
  },
];
