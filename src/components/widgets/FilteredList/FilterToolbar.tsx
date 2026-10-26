import type { FilterToolbarProps } from './types';

export const FilterToolbar = ({
  title,
  totalLoaded,
}: FilterToolbarProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h4 className="text-base font-semibold text-gray-800">{title}</h4>
        <p className="text-xs text-gray-500 mt-0.5">
          Знайдено країн у вибірці: {totalLoaded}
        </p>
      </div>
    </div>
  );
};
