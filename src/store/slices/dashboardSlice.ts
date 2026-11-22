import { createSlice, createAsyncThunk, createSelector, type PayloadAction } from '@reduxjs/toolkit';
import { fetchCountries } from '../../services/diseaseApi';
import type { CountryEpidemicStat, EpidemicKpi } from '../../types/dashboard';
import type { FilterFormValues } from '../../components/widgets/FilterForm/types';
import type { SortField } from '../../components/widgets/FilteredList/types';
import { validateFilters } from '../../components/widgets/FilterForm/validation';

export type ChartType = 'grouped' | 'stacked';

export interface ChartDataItem {
  name: string;
  cases: number;
  recovered: number;
  deaths: number;
  active: number;
}

export interface DashboardState {
  countries: CountryEpidemicStat[];
  isLoading: boolean;
  error: string | null;
  filters: FilterFormValues;
  onlyFavorites: boolean;
  favorites: string[];
  chartType: ChartType;
}

export const initialFilters: FilterFormValues = {
  search: '',
  continent: 'Всі',
  sortBy: 'cases',
  sortDirection: 'desc',
  minCases: 0,
};

function getInitialFavorites(): string[] {
  try {
    const saved = localStorage.getItem('cop_favorites');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

const initialState: DashboardState = {
  countries: [],
  isLoading: false,
  error: null,
  filters: initialFilters,
  onlyFavorites: false,
  favorites: getInitialFavorites(),
  chartType: 'grouped',
};

export const fetchCountriesThunk = createAsyncThunk<CountryEpidemicStat[]>(
  'dashboard/fetchCountries',
  async (_, { signal }) => {
    return fetchCountries(signal);
  }
);

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setFilter: <K extends keyof FilterFormValues>(
      state: DashboardState,
      action: PayloadAction<{ field: K; value: FilterFormValues[K] }>
    ) => {
      state.filters[action.payload.field] = action.payload.value;
    },
    resetFilters: (state) => {
      state.filters = initialFilters;
      state.onlyFavorites = false;
    },
    setTableSort: (state, action: PayloadAction<SortField>) => {
      const field = action.payload;
      if (state.filters.sortBy === field) {
        state.filters.sortDirection = state.filters.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        state.filters.sortBy = field;
        state.filters.sortDirection = 'desc';
      }
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const index = state.favorites.indexOf(id);
      if (index >= 0) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(id);
      }
    },
    setOnlyFavorites: (state, action: PayloadAction<boolean>) => {
      state.onlyFavorites = action.payload;
    },
    setChartType: (state, action: PayloadAction<ChartType>) => {
      state.chartType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountriesThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCountriesThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.countries = action.payload;
      })
      .addCase(fetchCountriesThunk.rejected, (state, action) => {
        if (action.error.name === 'AbortError') {
          return;
        }
        state.isLoading = false;
        state.error = action.error.message ?? 'Помилка завантаження даних';
      });
  },
});

export const {
  setFilter,
  resetFilters,
  setTableSort,
  toggleFavorite,
  setOnlyFavorites,
  setChartType,
} = dashboardSlice.actions;

export const dashboardReducer = dashboardSlice.reducer;

interface StateWithDashboard {
  dashboard: DashboardState;
}

export const selectCountries = (state: StateWithDashboard) => state.dashboard.countries;
export const selectIsLoading = (state: StateWithDashboard) => state.dashboard.isLoading;
export const selectError = (state: StateWithDashboard) => state.dashboard.error;
export const selectFilters = (state: StateWithDashboard) => state.dashboard.filters;
export const selectOnlyFavorites = (state: StateWithDashboard) => state.dashboard.onlyFavorites;
export const selectFavorites = (state: StateWithDashboard) => state.dashboard.favorites;
export const selectChartType = (state: StateWithDashboard) => state.dashboard.chartType;

export const selectValidationErrors = createSelector(
  [selectFilters],
  (filters) => validateFilters(filters)
);

export const selectAvailableContinents = createSelector(
  [selectCountries],
  (countries) => ['Всі', ...Array.from(new Set(countries.map((c) => c.continent).filter(Boolean)))]
);

export const selectFilteredCountries = createSelector(
  [selectCountries, selectFilters, selectValidationErrors, selectOnlyFavorites, selectFavorites],
  (countries, filters, errors, onlyFavorites, favorites) => {
    const hasSearchError = Boolean(errors.search);
    const searchTrimmed = filters.search.trim().toLowerCase();

    const filtered = countries.filter((c) => {
      if (onlyFavorites && !favorites.includes(c.id)) {
        return false;
      }
      if (filters.continent !== 'Всі' && c.continent !== filters.continent) {
        return false;
      }
      if (c.cases < filters.minCases) {
        return false;
      }
      if (!hasSearchError && searchTrimmed && !c.country.toLowerCase().includes(searchTrimmed)) {
        return false;
      }
      return true;
    });

    return [...filtered].sort((a, b) => {
      const modifier = filters.sortDirection === 'asc' ? 1 : -1;
      if (filters.sortBy === 'country') {
        return a.country.localeCompare(b.country) * modifier;
      }
      return (a[filters.sortBy] - b[filters.sortBy]) * modifier;
    });
  }
);

export const selectKpiCards = createSelector(
  [selectFilteredCountries, selectFilters, selectOnlyFavorites],
  (filteredCountries, filters, onlyFavorites): EpidemicKpi[] => {
    const totalCases = filteredCountries.reduce((sum, c) => sum + c.cases, 0);
    const totalRecovered = filteredCountries.reduce((sum, c) => sum + c.recovered, 0);
    const totalDeaths = filteredCountries.reduce((sum, c) => sum + c.deaths, 0);
    const activeCases = Math.max(0, totalCases - totalRecovered - totalDeaths);

    const isFiltered =
      filters.continent !== 'Всі' ||
      filters.minCases > 0 ||
      filters.search.trim() !== '' ||
      onlyFavorites;

    const scopeLabel = isFiltered ? 'за поточною вибіркою' : 'глобально по світу';

    return [
      {
        id: 'kpi-cases',
        title: 'Усього випадків',
        value: totalCases.toLocaleString(),
        change: scopeLabel,
        type: 'cases',
        isPositive: false,
      },
      {
        id: 'kpi-recovered',
        title: 'Усього одужань',
        value: totalRecovered.toLocaleString(),
        change: scopeLabel,
        type: 'recovered',
        isPositive: true,
      },
      {
        id: 'kpi-deaths',
        title: 'Летальні випадки',
        value: totalDeaths.toLocaleString(),
        change: scopeLabel,
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
  }
);

export const selectChartData = createSelector(
  [selectFilteredCountries],
  (filteredCountries): ChartDataItem[] => {
    return filteredCountries.slice(0, 10).map((c) => ({
      name: c.country,
      cases: c.cases,
      recovered: c.recovered,
      deaths: c.deaths,
      active: Math.max(0, c.cases - c.recovered - c.deaths),
    }));
  }
);
