import { useEffect } from 'react';
import {
  Counter,
  FilteredList,
  FilterForm,
  KpiCard,
  Toggle,
} from '../components/widgets';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  fetchCountriesThunk,
  selectCountries,
  selectFilters,
  selectKpiCards,
  selectOnlyFavorites,
} from '../store/slices/dashboardSlice';
import type { EpidemicKpi } from '../types/dashboard';

export function DashboardPage() {
  const dispatch = useAppDispatch();
  const countries = useAppSelector(selectCountries);
  const kpiCards = useAppSelector(selectKpiCards);
  const filters = useAppSelector(selectFilters);
  const onlyFavorites = useAppSelector(selectOnlyFavorites);

  useEffect(() => {
    if (countries.length === 0) {
      const promise = dispatch(fetchCountriesThunk());
      return () => {
        promise.abort();
      };
    }
  }, [dispatch, countries.length]);

  const isFiltered =
    filters.continent !== 'Всі' ||
    filters.minCases > 0 ||
    filters.search.trim() !== '' ||
    onlyFavorites;

  return (
    <>
      <section>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
          {isFiltered ? 'Показники за поточною вибіркою' : 'Глобальні показники'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiCards.map((kpi: EpidemicKpi) => (
            <KpiCard
              key={kpi.id}
              title={kpi.title}
              value={kpi.value}
              change={kpi.change}
              type={kpi.type}
              isPositive={kpi.isPositive}
            />
          ))}
        </div>
      </section>

      <section>
        <FilterForm />
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
          Деталізація за регіонами
        </h2>
        <FilteredList />
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
          Параметри аналітики
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Counter
            title="Період історичної динаміки"
            initialValue={14}
            step={7}
            unit="днів"
            min={7}
            max={90}
          />
          <Toggle
            label="Формат числових даних"
            optionA="Абсолютні значення"
            optionB="На 1 млн населення"
          />
        </div>
      </section>
    </>
  );
}
