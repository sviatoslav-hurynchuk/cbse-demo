import { useState, useEffect } from 'react';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { Counter, FilteredList, KpiCard, Toggle } from './components/widgets';
import { mockKpiData } from './data/mockData';
import { fetchGlobalKpi, fetchCountries } from './services/diseaseApi';
import type { EpidemicKpi, CountryEpidemicStat } from './types/dashboard';

export function App() {
  const [kpiData, setKpiData] = useState<EpidemicKpi[]>(mockKpiData);
  const [countries, setCountries] = useState<CountryEpidemicStat[]>([]);
  const [isLoadingCountries, setIsLoadingCountries] = useState<boolean>(true);
  const [countriesError, setCountriesError] = useState<string | null>(null);

  const loadCountries = async () => {
    setIsLoadingCountries(true);
    setCountriesError(null);

    try {
      const data = await fetchCountries();
      setCountries(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setCountriesError(err.message);
      } else {
        setCountriesError('Помилка завантаження даних');
      }
    } finally {
      setIsLoadingCountries(false);
    }
  };

  useEffect(() => {
    fetchGlobalKpi()
      .then((data) => {
        setKpiData(data);
      })
      .catch(() => {});

    void loadCountries();
  }, []);

  return (
    <DashboardLayout
      title="disease.sh dashboard"
      subtitle="Lab02"
    >
      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Глобальні показники</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiData.map((kpi) => (
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
          countries={countries}
          isLoading={isLoadingCountries}
          error={countriesError}
          onRetry={loadCountries}
        />
      </section>
    </DashboardLayout>
  );
}

export default App;
