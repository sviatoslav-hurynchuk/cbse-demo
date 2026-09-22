import type { FilteredListProps } from './types';
import {useState} from "react";

export const FilteredList = ({
  title = 'Статистика по країнах (disease.sh)',
  countries,
  continents,
}: FilteredListProps) => {
    const [selectedContinent, setSelectedContinent] = useState('Всі');
    const filteredCountries = selectedContinent === 'Всі'
        ? countries
        : countries.filter(c => c.continent === selectedContinent);
  return (
    <div className="p-5 rounded-xl border border-dashed border-gray-300 bg-white">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-2">
        <div>
          <h4 className="text-base font-semibold text-gray-800">{title}</h4>
          <p className="text-xs text-gray-500">
            Завантажено країн: {countries.length} | Континентів для фільтрації: {continents.length}
          </p>
            <select value={selectedContinent} onChange={(e) => setSelectedContinent(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500">
                {continents.map(continent => (
                    <option key={continent} value={continent}>{continent}</option>
                ))}
            </select>
        </div>
      </div>

      <div className="mt-4 border-t border-gray-100 pt-3 text-sm">
          <table>
              <thead>
              <tr>
                  <th className="py-3 px-4">країна</th>
                  <th className="py-3 px-4">континент</th>
                  <th className="py-3 px-4 text-right">випадки</th>
                  <th className="py-3 px-4 text-right">одужало</th>
                  <th className="py-3 px-4 text-right">смерті</th>
              </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
              {filteredCountries.length > 0 ? (
                  filteredCountries.map((country) => (
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
    </div>
  );
};
