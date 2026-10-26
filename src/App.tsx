import { DashboardLayout } from './components/layout/DashboardLayout';
import {
  Counter,
  FilteredList,
  FilterForm,
  KpiCard,
  Toggle,
} from './components/widgets';
import { useCovidDashboard } from './hooks';

export function App() {
  const {
    filters,
    kpiCards,
    sortedCountries,
    availableContinents,
    isLoading,
    error,
    isFiltered,
    handleFilterChange,
    handleResetFilters,
    handleTableSort,
    loadCountries,
  } = useCovidDashboard();

  return (
    <DashboardLayout
      title="disease.sh dashboard"
      subtitle="Lab03"
    >
      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          {isFiltered ? 'Показники за поточною вибіркою' : 'Глобальні показники'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiCards.map((kpi) => (
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
        <FilterForm
          values={filters}
          continents={availableContinents}
          onChange={handleFilterChange}
          onReset={handleResetFilters}
        />
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Деталізація за регіонами</h2>
        <FilteredList
          title="Країни світу"
          countries={sortedCountries}
          isLoading={isLoading}
          error={error}
          onRetry={loadCountries}
          sortField={filters.sortBy}
          sortDirection={filters.sortDirection}
          onSort={handleTableSort}
        />
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Параметри аналітики</h2>
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
    </DashboardLayout>
  );
}

export default App;
