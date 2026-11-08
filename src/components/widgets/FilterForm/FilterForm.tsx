import type { FilterFormProps } from './types';
import type { SortField, SortDirection } from '../FilteredList/types';
import { Button } from '../../common/Button';
import { useOptionalDashboard } from '../../../context';

export const FilterForm = ({
  values: propValues,
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
  const continents = propContinents ?? context?.availableContinents ?? ['Всі'];
  const onChange = propOnChange ?? context?.handleFilterChange ?? (() => {});
  const onReset = propOnReset ?? context?.handleResetFilters ?? (() => {});

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
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Пошук за назвою країни
          </label>
          <input
            type="text"
            value={values.search}
            onChange={(e) => onChange('search', e.target.value)}
            placeholder="Наприклад: Ukraine, Poland..."
            className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-800 transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Континент
          </label>
          <select
            value={values.continent}
            onChange={(e) => onChange('continent', e.target.value)}
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
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Сортування
          </label>
          <div className="grid grid-cols-2 gap-2">
            <select
              value={values.sortBy}
              onChange={(e) => onChange('sortBy', e.target.value as SortField)}
              className="w-full px-2 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              <option value="cases">Випадки</option>
              <option value="recovered">Одужало</option>
              <option value="deaths">Смерті</option>
              <option value="country">Країна</option>
            </select>
            <select
              value={values.sortDirection}
              onChange={(e) => onChange('sortDirection', e.target.value as SortDirection)}
              className="w-full px-2 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              <option value="desc">Спадання ↓</option>
              <option value="asc">Зростання ↑</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Поріг захворюваності
          </label>
          <select
            value={values.minCases}
            onChange={(e) => onChange('minCases', Number(e.target.value))}
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

export type { FilterFormValues, FilterFormProps } from './types';
