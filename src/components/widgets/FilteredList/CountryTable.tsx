import type { CountryTableProps, SortField } from './types';

export const CountryTable = ({
  countries,
  sortField,
  sortDirection,
  onSort,
}: CountryTableProps) => {
  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <span className="text-gray-300 ml-1 text-xs">↕</span>;
    }
    return (
      <span className="text-blue-600 ml-1 text-xs font-bold">
        {sortDirection === 'asc' ? '▲' : '▼'}
      </span>
    );
  };

  return (
    <div className="mt-4 border-t border-gray-100 pt-3 overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <th className="py-3 px-4">
              <button
                type="button"
                onClick={() => onSort('country')}
                className="flex items-center gap-1 font-semibold uppercase hover:text-gray-900 cursor-pointer"
              >
                Країна {renderSortIcon('country')}
              </button>
            </th>
            <th className="py-3 px-4">Континент</th>
            <th className="py-3 px-4 text-right">
              <button
                type="button"
                onClick={() => onSort('cases')}
                className="inline-flex items-center gap-1 font-semibold uppercase hover:text-gray-900 cursor-pointer ml-auto"
              >
                Випадки {renderSortIcon('cases')}
              </button>
            </th>
            <th className="py-3 px-4 text-right">
              <button
                type="button"
                onClick={() => onSort('recovered')}
                className="inline-flex items-center gap-1 font-semibold uppercase hover:text-gray-900 cursor-pointer ml-auto"
              >
                Одужало {renderSortIcon('recovered')}
              </button>
            </th>
            <th className="py-3 px-4 text-right">
              <button
                type="button"
                onClick={() => onSort('deaths')}
                className="inline-flex items-center gap-1 font-semibold uppercase hover:text-gray-900 cursor-pointer ml-auto"
              >
                Смерті {renderSortIcon('deaths')}
              </button>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
          {countries.length > 0 ? (
            countries.map((country) => (
              <tr key={country.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 font-medium flex items-center gap-2">
                  {country.flag && (
                    country.flag.startsWith('http') ? (
                      <img
                        src={country.flag}
                        alt=""
                        className="w-5 h-3.5 object-cover rounded-xs border border-gray-200 shrink-0"
                      />
                    ) : (
                      <span>{country.flag}</span>
                    )
                  )}
                  <span>{country.country}</span>
                </td>
                <td className="py-3 px-4 text-gray-500">{country.continent}</td>
                <td className="py-3 px-4 text-right font-mono font-medium">
                  {country.cases.toLocaleString()}
                </td>
                <td className="py-3 px-4 text-right font-mono text-emerald-600">
                  {country.recovered.toLocaleString()}
                </td>
                <td className="py-3 px-4 text-right font-mono text-rose-600">
                  {country.deaths.toLocaleString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="py-6 text-center text-gray-400">
                Країн у цьому регіоні не знайдено
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
