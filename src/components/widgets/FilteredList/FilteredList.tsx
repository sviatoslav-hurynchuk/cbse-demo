import type { FilteredListProps } from './types';

export const FilteredList = ({
  title = 'Статистика по країнах (disease.sh)',
  countries,
  continents,
}: FilteredListProps) => {
  // TODO: Додати стан обраного континенту (useState)
  // TODO: Реалізувати фільтрацію масиву countries за обраним континентом
  // TODO: Зробити controlled select для вибору континенту
  // TODO: Відрендерити таблицю/список країн із коректними key (key={country.id})

  return (
    <div className="p-5 rounded-xl border border-dashed border-gray-300 bg-white">
      <span className="text-xs text-gray-400 font-mono">[Filtered Country List Skeleton]</span>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-2">
        <div>
          <h4 className="text-base font-semibold text-gray-800">{title}</h4>
          <p className="text-xs text-gray-500">
            Завантажено країн: {countries.length} | Континентів для фільтрації: {continents.length}
          </p>
        </div>
        {/* TODO: Select категорій (континентів) */}
      </div>

      {/* TODO: Таблиця або список країн із показниками */}
      <div className="mt-4 border-t border-gray-100 pt-3 text-sm text-gray-400 italic">
        Місце для відфільтрованої таблиці країн...
      </div>
    </div>
  );
};
