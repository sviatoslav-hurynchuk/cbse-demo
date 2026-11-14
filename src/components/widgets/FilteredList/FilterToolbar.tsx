import type { FilterToolbarProps } from './types';
import { Button } from '../../common/Button';

export const FilterToolbar = ({
  title,
  totalLoaded,
  favoritesCount = 0,
  onlyFavorites = false,
  onToggleOnlyFavorites,
}: FilterToolbarProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 dark:border-gray-800 pb-3">
      <div>
        <h4 className="text-base font-semibold text-gray-800 dark:text-gray-100">{title}</h4>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          Знайдено країн у вибірці: {totalLoaded}
        </p>
      </div>

      {onToggleOnlyFavorites && (
        <Button
          type="button"
          variant={onlyFavorites ? 'primary' : 'outline'}
          onClick={onToggleOnlyFavorites}
          className="text-xs px-3 py-1.5 flex items-center gap-1.5 shrink-0"
        >
          <span className="text-amber-500 font-bold">{onlyFavorites ? '★' : '☆'}</span>
          <span>Лише обрані</span>
          {favoritesCount > 0 && (
            <span
              className={`px-1.5 py-0.5 rounded-full text-xs font-mono font-bold ${
                onlyFavorites
                  ? 'bg-blue-800 text-white dark:bg-blue-900'
                  : 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300'
              }`}
            >
              {favoritesCount}
            </span>
          )}
        </Button>
      )}
    </div>
  );
};
