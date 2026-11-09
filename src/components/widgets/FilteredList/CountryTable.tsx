import { Link, useNavigate } from 'react-router';
import type { CountryTableProps, SortField } from './types';

export const CountryTable = ({
  countries,
  sortField,
  sortDirection,
  onSort,
}: CountryTableProps) => {
  const navigate = useNavigate();

  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <span className="text-gray-300 dark:text-gray-600 ml-1 text-xs">↕</span>;
    }
    return (
      <span className="text-blue-600 dark:text-blue-400 ml-1 text-xs font-bold">
        {sortDirection === 'asc' ? '▲' : '▼'}
      </span>
    );
  };

  return (
    <div className="mt-4 border-t border-gray-100 dark:border-gray-800 pt-3 overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-800 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            <th className="py-3 px-4">
              <button
                type="button"
                onClick={() => onSort('country')}
                className="flex items-center gap-1 font-semibold uppercase hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer"
              >
                Країна {renderSortIcon('country')}
              </button>
            </th>
            <th className="py-3 px-4">Континент</th>
            <th className="py-3 px-4 text-right">
              <button
                type="button"
                onClick={() => onSort('cases')}
                className="inline-flex items-center gap-1 font-semibold uppercase hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer ml-auto"
              >
                Випадки {renderSortIcon('cases')}
              </button>
            </th>
            <th className="py-3 px-4 text-right">
              <button
                type="button"
                onClick={() => onSort('recovered')}
                className="inline-flex items-center gap-1 font-semibold uppercase hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer ml-auto"
              >
                Одужало {renderSortIcon('recovered')}
              </button>
            </th>
            <th className="py-3 px-4 text-right">
              <button
                type="button"
                onClick={() => onSort('deaths')}
                className="inline-flex items-center gap-1 font-semibold uppercase hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer ml-auto"
              >
                Смерті {renderSortIcon('deaths')}
              </button>
            </th>
            <th className="py-3 px-4 text-center">Деталі</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm text-gray-700 dark:text-gray-300">
          {countries.length > 0 ? (
            countries.map((country) => (
              <tr
                key={country.id}
                onClick={() => navigate(`/country/${encodeURIComponent(country.id)}`)}
                className="hover:bg-blue-50/50 dark:hover:bg-blue-950/20 cursor-pointer transition-colors group"
              >
                <td className="py-3 px-4 font-medium flex items-center gap-2">
                  {country.flag && (
                    country.flag.startsWith('http') ? (
                      <img
                        src={country.flag}
                        alt=""
                        className="w-5 h-3.5 object-cover rounded-xs border border-gray-200 dark:border-gray-700 shrink-0"
                      />
                    ) : (
                      <span>{country.flag}</span>
                    )
                  )}
                  <Link
                    to={`/country/${encodeURIComponent(country.id)}`}
                    onClick={(e) => e.stopPropagation()}
                    className="group-hover:text-blue-600 dark:group-hover:text-blue-400 font-semibold transition-colors"
                  >
                    {country.country}
                  </Link>
                </td>
                <td className="py-3 px-4 text-gray-500 dark:text-gray-400">{country.continent}</td>
                <td className="py-3 px-4 text-right font-mono font-medium text-gray-900 dark:text-gray-100">
                  {country.cases.toLocaleString()}
                </td>
                <td className="py-3 px-4 text-right font-mono text-emerald-600 dark:text-emerald-400">
                  {country.recovered.toLocaleString()}
                </td>
                <td className="py-3 px-4 text-right font-mono text-rose-600 dark:text-rose-400">
                  {country.deaths.toLocaleString()}
                </td>
                <td className="py-3 px-4 text-center">
                  <Link
                    to={`/country/${encodeURIComponent(country.id)}`}
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Клік →
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="py-6 text-center text-gray-400 dark:text-gray-500">
                Країн у цьому регіоні не знайдено
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
