import type { CountryEpidemicStat, EpidemicKpi } from '../types/dashboard';

const BASE_URL = 'https://disease.sh/v3/covid-19';

const continentMap: Record<string, string> = {
    'Europe': 'Європа',
    'Asia': 'Азія',
    'North America': 'Північна Америка',
    'South America': 'Південна Америка',
    'Africa': 'Африка',
    'Australia-Oceania': 'Австралія/Океанія',
};

export async function fetchCountries(): Promise<CountryEpidemicStat[]> {
    const response = await fetch(`${BASE_URL}/countries`);

    if (!response.ok) {
        throw new Error(`Помилка завантаження країн: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    return data.map((item: any) => ({
        id: item.countryInfo?.iso2 || item.country,
        country: item.country,
        continent: continentMap[item.continent] || item.continent || 'Інше',
        cases: item.cases,
        recovered: item.recovered,
        deaths: item.deaths,
        flag: item.countryInfo?.flag, // посилання на реальне зображення прапора з disease.sh
    }));
}

export async function fetchGlobalKpi(): Promise<EpidemicKpi[]> {
    const response = await fetch(`${BASE_URL}/all`);

    if (!response.ok) {
        throw new Error(`Помилка завантаження KPI: ${response.status}`);
    }

    const data = await response.json();

    return [
        {
            id: 'kpi-cases',
            title: 'Усього випадків',
            value: data.cases.toLocaleString(),
            change: `+${(data.todayCases || 0).toLocaleString()} сьогодні`,
            type: 'cases',
            isPositive: false,
        },
        {
            id: 'kpi-recovered',
            title: 'Усього одужань',
            value: data.recovered.toLocaleString(),
            change: `+${(data.todayRecovered || 0).toLocaleString()} сьогодні`,
            type: 'recovered',
            isPositive: true,
        },
        {
            id: 'kpi-deaths',
            title: 'Летальні випадки',
            value: data.deaths.toLocaleString(),
            change: `+${(data.todayDeaths || 0).toLocaleString()} сьогодні`,
            type: 'deaths',
            isPositive: false,
        },
        {
            id: 'kpi-active',
            title: 'Активні випадки',
            value: data.active.toLocaleString(),
            change: 'поточні хворі',
            type: 'active',
            isPositive: true,
        },
    ];
}