import { useState } from 'react';
import type { FilteredListProps } from './types';
import { FilterToolbar } from './FilterToolbar';
import { CountryTable } from './CountryTable';

export const FilteredList = ({
  title = 'Статистика по країнах (disease.sh)',
  countries,
  continents,
}: FilteredListProps) => {
  const [selectedContinent, setSelectedContinent] = useState('Всі');

  const filteredCountries = selectedContinent === 'Всі'
    ? countries
    : countries.filter((country) => country.continent === selectedContinent);

  return (
    <div className="p-5 rounded-xl border border-gray-200 shadow-xs bg-white">
      <FilterToolbar
        title={title}
        totalLoaded={countries.length}
        continents={continents}
        selectedContinent={selectedContinent}
        onContinentChange={setSelectedContinent}
      />

      <CountryTable countries={filteredCountries} />
    </div>
  );
};
