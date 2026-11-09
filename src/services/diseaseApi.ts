import type { CountryEpidemicStat, CountryDetailStat } from '../types/dashboard';

const BASE_URL = 'https://disease.sh/v3/covid-19';

const continentMap: Record<string, string> = {
  'Europe': 'Європа',
  'Asia': 'Азія',
  'North America': 'Північна Америка',
  'South America': 'Південна Америка',
  'Africa': 'Африка',
  'Australia-Oceania': 'Австралія/Океанія',
};

interface DiseaseShCountryRaw {
  country: string;
  continent: string;
  cases: number;
  recovered: number;
  deaths: number;
  countryInfo?: {
    _id?: number;
    iso2?: string;
    iso3?: string;
    lat?: number;
    long?: number;
    flag?: string;
  };
  population?: number;
  todayCases?: number;
  todayDeaths?: number;
  todayRecovered?: number;
  active?: number;
  critical?: number;
  casesPerOneMillion?: number;
  deathsPerOneMillion?: number;
  tests?: number;
  testsPerOneMillion?: number;
}

export async function fetchCountries(signal?: AbortSignal): Promise<CountryEpidemicStat[]> {
  const response = await fetch(`${BASE_URL}/countries`, { signal });

  if (!response.ok) {
    throw new Error(`Помилка завантаження країн: ${response.status} ${response.statusText}`);
  }

  const data: DiseaseShCountryRaw[] = await response.json();

  return data.map((item) => ({
    id: item.countryInfo?.iso2 || item.country,
    country: item.country,
    continent: (continentMap[item.continent] || item.continent || 'Інше') as CountryEpidemicStat['continent'],
    cases: item.cases ?? 0,
    recovered: item.recovered ?? 0,
    deaths: item.deaths ?? 0,
    flag: item.countryInfo?.flag,
  }));
}

export async function fetchCountryDetails(code: string, signal?: AbortSignal): Promise<CountryDetailStat> {
  const response = await fetch(`${BASE_URL}/countries/${encodeURIComponent(code)}?strict=true`, { signal });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Країну з ідентифікатором "${code}" не знайдено`);
    }
    throw new Error(`Помилка завантаження даних країни: ${response.status} ${response.statusText}`);
  }

  const item: DiseaseShCountryRaw = await response.json();

  return {
    id: item.countryInfo?.iso2 || item.country,
    country: item.country,
    continent: (continentMap[item.continent] || item.continent || 'Інше') as CountryDetailStat['continent'],
    cases: item.cases ?? 0,
    recovered: item.recovered ?? 0,
    deaths: item.deaths ?? 0,
    flag: item.countryInfo?.flag,
    population: item.population ?? 0,
    todayCases: item.todayCases ?? 0,
    todayDeaths: item.todayDeaths ?? 0,
    todayRecovered: item.todayRecovered ?? 0,
    active: item.active ?? 0,
    critical: item.critical ?? 0,
    casesPerOneMillion: item.casesPerOneMillion ?? 0,
    deathsPerOneMillion: item.deathsPerOneMillion ?? 0,
    tests: item.tests ?? 0,
    testsPerOneMillion: item.testsPerOneMillion ?? 0,
    iso2: item.countryInfo?.iso2,
    iso3: item.countryInfo?.iso3,
    lat: item.countryInfo?.lat,
    long: item.countryInfo?.long,
  };
}
