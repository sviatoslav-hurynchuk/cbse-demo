import type { CountryTableProps } from './types';

export const CountryTable = ({ countries }: CountryTableProps) => {
  return (
    <div className="mt-4 border-t border-gray-100 pt-3 overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <th className="py-3 px-4">Країна</th>
            <th className="py-3 px-4">Континент</th>
            <th className="py-3 px-4 text-right">Випадки</th>
            <th className="py-3 px-4 text-right">Одужало</th>
            <th className="py-3 px-4 text-right">Смерті</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
          {countries.length > 0 ? (
            countries.map((country) => (
              <tr key={country.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 font-medium flex items-center gap-2">
                  <span>{country.flag}</span>
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
