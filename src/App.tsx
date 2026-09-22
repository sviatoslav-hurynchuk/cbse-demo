import { DashboardLayout } from './components/layout/DashboardLayout';
import { Counter, FilteredList, KpiCard, Toggle } from './components/widgets';
import { mockContinents, mockCountriesData, mockKpiData } from './data/mockData';

export function App() {
  return (
    <DashboardLayout
      title="disease.sh dashboard"
      subtitle="Lab01"
    >
      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Глобальні показники</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockKpiData.map((kpi) => (
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

      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Деталізація за регіонами</h2>
        <FilteredList
          title="Країни світу"
          countries={mockCountriesData}
          continents={mockContinents}
        />
      </section>
    </DashboardLayout>
  );
}

export default App;
