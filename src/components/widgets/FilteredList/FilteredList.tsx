import { useState } from 'react';
import type { FilteredListProps, SortField } from './types';
import { FilterToolbar } from './FilterToolbar';
import { CountryTable } from './CountryTable';
import { Pagination } from './Pagination';
import { Button } from '../../common/Button';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  selectFilteredCountries,
  selectIsLoading,
  selectError,
  selectFilters,
  setTableSort,
  fetchCountriesThunk,
} from '../../../store/slices/dashboardSlice';

export const FilteredList = ({
  title = 'Статистика по країнах (disease.sh)',
  countries: propCountries,
  isLoading: propIsLoading,
  error: propError,
  onRetry: propOnRetry,
  sortField: propSortField,
  sortDirection: propSortDirection,
  onSort: propOnSort,
}: Partial<FilteredListProps> = {}) => {
  const dispatch = useAppDispatch();

  const reduxCountries = useAppSelector(selectFilteredCountries);
  const reduxIsLoading = useAppSelector(selectIsLoading);
  const reduxError = useAppSelector(selectError);
  const reduxFilters = useAppSelector(selectFilters);

  const countries = propCountries ?? reduxCountries;
  const isLoading = propIsLoading ?? reduxIsLoading;
  const error = propError ?? reduxError;
  const onRetry = propOnRetry ?? (() => dispatch(fetchCountriesThunk()));
  const sortField = propSortField ?? reduxFilters.sortBy;
  const sortDirection = propSortDirection ?? reduxFilters.sortDirection;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 15;

  const handleSort = (field: SortField) => {
    if (propOnSort) {
      propOnSort(field);
    } else {
      dispatch(setTableSort(field));
    }
    setCurrentPage(1);
  };

  const totalPages = Math.max(1, Math.ceil(countries.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const paginatedCountries = countries.slice(startIndex, startIndex + pageSize);

  return (
    <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 shadow-xs bg-white dark:bg-gray-900 transition-colors">
      <FilterToolbar
        title={title}
        totalLoaded={countries.length}
      />

      {isLoading && (
        <div className="py-12 flex flex-col items-center justify-center gap-3 text-gray-500 dark:text-gray-400">
          <div className="w-8 h-8 border-3 border-blue-600 dark:border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium">Завантаження реальних даних з disease.sh...</p>
        </div>
      )}

      {!isLoading && error && (
        <div className="my-6 p-4 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <p className="font-semibold text-sm">Сталася помилка під час запиту</p>
            <p className="text-xs text-rose-600 dark:text-rose-400">{error}</p>
          </div>
          {onRetry && (
            <Button variant="outline" onClick={onRetry} className="text-xs shrink-0">
              Спробувати знову
            </Button>
          )}
        </div>
      )}

      {!isLoading && !error && countries.length === 0 && (
        <div className="py-12 text-center text-gray-400 dark:text-gray-500 text-sm">
          Дані відсутні або список країн порожній.
        </div>
      )}

      {!isLoading && !error && countries.length > 0 && (
        <>
          <CountryTable
            countries={paginatedCountries}
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={handleSort}
          />
          <Pagination
            currentPage={safePage}
            totalPages={totalPages}
            pageSize={pageSize}
            totalItems={countries.length}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};
