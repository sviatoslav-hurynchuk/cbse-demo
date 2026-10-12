import { useState } from 'react';
import type { FilteredListProps, SortDirection, SortField } from './types';
import { FilterToolbar } from './FilterToolbar';
import { CountryTable } from './CountryTable';
import { Pagination } from './Pagination';
import { Button } from '../../common/Button';

export const FilteredList = ({
  title = 'Статистика по країнах (disease.sh)',
  countries = [],
  isLoading = false,
  error = null,
  onRetry,
}: FilteredListProps) => {
  const [selectedContinent, setSelectedContinent] = useState<string>('Всі');
  const [sortField, setSortField] = useState<SortField>('cases');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const pageSize = 15;

  const handleContinentChange = (continent: string) => {
    setSelectedContinent(continent);
    setCurrentPage(1);
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
    setCurrentPage(1);
  };

  const availableContinents = [
    'Всі',
    ...Array.from(new Set(countries.map((c) => c.continent).filter(Boolean))),
  ];

  const filteredCountries = selectedContinent === 'Всі'
    ? countries
    : countries.filter((c) => c.continent === selectedContinent);

  const sortedCountries = [...filteredCountries].sort((a, b) => {
    const modifier = sortDirection === 'asc' ? 1 : -1;
    if (sortField === 'country') {
      return a.country.localeCompare(b.country) * modifier;
    }
    return (a[sortField] - b[sortField]) * modifier;
  });

  const totalPages = Math.max(1, Math.ceil(sortedCountries.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedCountries = sortedCountries.slice(startIndex, startIndex + pageSize);

  return (
    <div className="p-5 rounded-xl border border-gray-200 shadow-xs bg-white">
      <FilterToolbar
        title={title}
        totalLoaded={sortedCountries.length}
        continents={availableContinents}
        selectedContinent={selectedContinent}
        onContinentChange={handleContinentChange}
      />

      {isLoading && (
        <div className="py-12 flex flex-col items-center justify-center gap-3 text-gray-500">
          <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium">Завантаження реальних даних з disease.sh...</p>
        </div>
      )}

      {!isLoading && error && (
        <div className="my-6 p-4 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <p className="font-semibold text-sm">Сталася помилка під час запиту</p>
            <p className="text-xs text-rose-600">{error}</p>
          </div>
          {onRetry && (
            <Button variant="outline" onClick={onRetry} className="text-xs shrink-0">
              Спробувати знову
            </Button>
          )}
        </div>
      )}

      {!isLoading && !error && countries.length === 0 && (
        <div className="py-12 text-center text-gray-400 text-sm">
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
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            totalItems={sortedCountries.length}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};
