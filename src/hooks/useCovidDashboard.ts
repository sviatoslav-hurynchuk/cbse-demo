import { useState } from 'react';
import { fetchCountries } from '../services/diseaseApi';
import { useDebounce } from './useDebounce';
import { useFetch } from './useFetch';
import type { SortField } from '../components/widgets/FilteredList/types';
import type { FilterFormValues } from '../components/widgets/FilterForm/types';
import type { EpidemicKpi } from '../types/dashboard';

const initialFilters: FilterFormValues = {
  search: '',
  continent: 'Всі',
  sortBy: 'cases',
  sortDirection: 'desc',
  minCases: 0,
};

export function useCovidDashboard() {
  const [filters, setFilters] = useState<FilterFormValues>(initialFilters);

  const debouncedSearch = useDebounce(filters.search, 400);

  const {
    data: rawCountries,
    loading: isLoading,
    error,
    refetch: loadCountries,
  } = useFetch(fetchCountries);

  const handleFilterChange = <K extends keyof FilterFormValues>(
    field: K,
    value: FilterFormValues[K]
  ) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
  };

  const handleTableSort = (field: SortField) => {
    if (filters.sortBy === field) {
      setFilters((prev) => ({
        ...prev,
        sortDirection: prev.sortDirection === 'asc' ? 'desc' : 'asc',
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        sortBy: field,
        sortDirection: 'desc',
      }));
    }
  };

  const allCountries = rawCountries ?? [];

  const availableContinents = [
    'Всі',
    ...Array.from(new Set(allCountries.map((c) => c.continent).filter(Boolean))),
  ];

  const filteredCountries = allCountries.filter((c) => {
    if (filters.continent !== 'Всі' && c.continent !== filters.continent) {
      return false;
    }
    if (c.cases < filters.minCases) {
      return false;
    }
    if (
      debouncedSearch.trim() &&
      !c.country.toLowerCase().includes(debouncedSearch.toLowerCase().trim())
    ) {
      return false;
    }
    return true;
  });

  const sortedCountries = [...filteredCountries].sort((a, b) => {
    const modifier = filters.sortDirection === 'asc' ? 1 : -1;
    if (filters.sortBy === 'country') {
      return a.country.localeCompare(b.country) * modifier;
    }
    return (a[filters.sortBy] - b[filters.sortBy]) * modifier;
  });

  const totalCases = filteredCountries.reduce((sum, c) => sum + c.cases, 0);
  const totalRecovered = filteredCountries.reduce((sum, c) => sum + c.recovered, 0);
  const totalDeaths = filteredCountries.reduce((sum, c) => sum + c.deaths, 0);
  const activeCases = Math.max(0, totalCases - totalRecovered - totalDeaths);

  const isFiltered =
    filters.continent !== 'Всі' ||
    filters.minCases > 0 ||
    debouncedSearch.trim() !== '';

  const kpiCards: EpidemicKpi[] = [
    {
      id: 'kpi-cases',
      title: 'Усього випадків',
      value: totalCases.toLocaleString(),
      change: isFiltered ? 'за поточною вибіркою' : 'глобально по світу',
      type: 'cases',
      isPositive: false,
    },
    {
      id: 'kpi-recovered',
      title: 'Усього одужань',
      value: totalRecovered.toLocaleString(),
      change: isFiltered ? 'за поточною вибіркою' : 'глобально по світу',
      type: 'recovered',
      isPositive: true,
    },
    {
      id: 'kpi-deaths',
      title: 'Летальні випадки',
      value: totalDeaths.toLocaleString(),
      change: isFiltered ? 'за поточною вибіркою' : 'глобально по світу',
      type: 'deaths',
      isPositive: false,
    },
    {
      id: 'kpi-active',
      title: 'Активні випадки',
      value: activeCases.toLocaleString(),
      change: 'розрахунковий залишок',
      type: 'active',
      isPositive: true,
    },
  ];

  return {
    filters,
    kpiCards,
    sortedCountries,
    availableContinents,
    isLoading,
    error,
    isFiltered,
    handleFilterChange,
    handleResetFilters,
    handleTableSort,
    loadCountries,
  };
}
