import type { ChangeEvent } from 'react';
import type { FilterFormProps, FilterFormValues, FilterFormErrors } from './types';
import { Button } from '../../common/Button';
import { useOptionalDashboard } from '../../../context';

export const FilterForm = ({
  values: propValues,
  errors: propErrors,
  continents: propContinents,
  onChange: propOnChange,
  onReset: propOnReset,
}: Partial<FilterFormProps> = {}) => {
  const context = useOptionalDashboard();

  const values = propValues ?? context?.filters ?? {
    search: '',
    continent: 'Всі',
    sortBy: 'cases',
    sortDirection: 'desc',
    minCases: 0,
  };
  const errors: FilterFormErrors | undefined = propErrors ?? context?.errors;
  const continents = propContinents ?? context?.availableContinents ?? ['Всі'];
  const onChange = propOnChange ?? context?.handleFilterChange ?? (() => {});
  const onReset = propOnReset ?? context?.handleResetFilters ?? (() => {});

  function handleInputChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    const parsed = type === 'number' || name === 'minCases' ? Number(value) : value;
    onChange(name as keyof FilterFormValues, parsed);
  }

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xs space-y-4 transition-colors"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-gray-100 dark:border-gray-800 pb-3">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-base">Фільтри та параметри пошуку</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">Керування вибіркою даних через контрольовану форму</p>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={onReset}
          className="text-xs px-3 py-1.5 shrink-0"
        >
          Скинути фільтри
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label htmlFor="filter-search" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Пошук за назвою країни
          </label>
          <input
            id="filter-search"
            name="search"
            type="text"
            value={values.search}
            onChange={handleInputChange}
            placeholder="Наприклад: Ukraine, Poland..."
            className={`w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 transition-colors ${
              errors?.search
                ? 'border-rose-400 dark:border-rose-600 focus:ring-rose-500 bg-rose-50/30'
                : 'border-gray-200 dark:border-gray-700 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-800'
            }`}
          />
          {errors?.search && (
            <p className="text-xs text-rose-600 dark:text-rose-400 mt-1 font-medium">
              {errors.search}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="filter-continent" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Континент
          </label>
          <select
            id="filter-continent"
            name="continent"
            value={values.continent}
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-800 transition-colors"
          >
            {continents.map((continent) => (
              <option key={continent} value={continent}>
                {continent}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="filter-sortBy" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Сортування
          </label>
          <div className="grid grid-cols-2 gap-2">
            <select
              id="filter-sortBy"
              name="sortBy"
              value={values.sortBy}
              onChange={handleInputChange}
              className="w-full px-2 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              <option value="cases">Випадки</option>
              <option value="recovered">Одужало</option>
              <option value="deaths">Смерті</option>
              <option value="country">Країна</option>
            </select>
            <select
              id="filter-sortDirection"
              name="sortDirection"
              value={values.sortDirection}
              onChange={handleInputChange}
              className="w-full px-2 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              <option value="desc">Спадання ↓</option>
              <option value="asc">Зростання ↑</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="filter-minCases" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Поріг захворюваності
          </label>
          <select
            id="filter-minCases"
            name="minCases"
            value={values.minCases}
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            <option value={0}>Усі показники</option>
            <option value={100000}>Більше 100 тис.</option>
            <option value={1000000}>Більше 1 млн</option>
            <option value={10000000}>Більше 10 млн</option>
          </select>
        </div>
      </div>
    </form>
  );
};

export type { FilterFormValues, FilterFormErrors, FilterFormProps } from './types';
