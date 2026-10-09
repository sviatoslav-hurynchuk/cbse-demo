import type { PaginationProps } from './types';
import { Button } from '../../common/Button';

export const Pagination = ({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
}: PaginationProps) => {
  if (totalItems === 0) {
    return null;
  }

  const startRange = (currentPage - 1) * pageSize + 1;
  const endRange = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-gray-100 pt-4 mt-3 text-sm">
      <span className="text-xs text-gray-500">
        Показано <span className="font-semibold text-gray-700">{startRange}–{endRange}</span> з{' '}
        <span className="font-semibold text-gray-700">{totalItems}</span> країн
      </span>

      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="text-xs px-2.5 py-1"
        >
          ← Назад
        </Button>

        <span className="text-xs font-medium text-gray-600 px-2">
          {currentPage} / {totalPages}
        </span>

        <Button
          type="button"
          variant="outline"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="text-xs px-2.5 py-1"
        >
          Вперед →
        </Button>
      </div>
    </div>
  );
};
