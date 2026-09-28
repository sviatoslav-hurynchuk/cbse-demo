import type { FilterToolbarProps } from './types';

export const FilterToolbar = ({
  title,
  totalLoaded,
  continents,
  selectedContinent,
  onContinentChange,
}: FilterToolbarProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h4 className="text-base font-semibold text-gray-800">{title}</h4>
        <p className="text-xs text-gray-500 mt-0.5">
          Завантажено країн: {totalLoaded} | Континентів для фільтрації: {continents.length}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="continent-select" className="text-xs font-medium text-gray-500">
          Континент:
        </label>
        <select
          id="continent-select"
          value={selectedContinent}
          onChange={(e) => onContinentChange(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg px-3 py-1.5 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          {continents.map((continent) => (
            <option key={continent} value={continent}>
              {continent}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
