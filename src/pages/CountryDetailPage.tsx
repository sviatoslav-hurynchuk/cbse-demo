import { useCallback, useEffect } from 'react';
import { Link, useParams } from 'react-router';
import { fetchCountryDetails } from '../services/diseaseApi';
import { useFetch } from '../hooks/useFetch';
import { Button } from '../components/common/Button';

export function CountryDetailPage() {
  const { code } = useParams<{ code: string }>();

  const fetcher = useCallback(async () => {
    if (!code) {
      throw new Error('Код країни не вказано в маршруті');
    }
    return fetchCountryDetails(code);
  }, [code]);

  const { data: country, loading, error, refetch } = useFetch(fetcher);

  useEffect(() => {
    if (country) {
      document.title = `${country.country} · disease.sh`;
    } else {
      document.title = 'Деталі країни · disease.sh';
    }
    return () => {
      document.title = 'disease.sh dashboard';
    };
  }, [country]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
        >
          ← Назад до дашборду
        </Link>
      </div>

      {loading && (
        <div className="p-12 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex flex-col items-center justify-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-600 dark:border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Завантаження розширеної аналітики для {code}...
          </p>
        </div>
      )}

      {!loading && (error || !country) && (
        <div className="p-8 rounded-2xl border border-rose-200 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/30 text-center space-y-4">
          <div className="w-12 h-12 mx-auto rounded-full bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 flex items-center justify-center text-xl font-bold">
            !
          </div>
          <div>
            <h3 className="text-lg font-bold text-rose-800 dark:text-rose-200">
              Країну не знайдено (404)
            </h3>
            <p className="text-sm text-rose-600 dark:text-rose-400 mt-1 max-w-md mx-auto">
              {error ?? `Запит для ідентифікатора "${code}" не повернув результатів у базі даних disease.sh.`}
            </p>
          </div>
          <div className="flex justify-center gap-3 pt-2">
            <Link to="/">
              <Button variant="primary">← Повернутися до списку</Button>
            </Link>
            <Button variant="outline" onClick={refetch}>
              Спробувати знову
            </Button>
          </div>
        </div>
      )}

      {!loading && !error && country && (
        <div className="space-y-6">
          <div className="p-6 md:p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 transition-colors">
            <div className="flex items-center gap-4">
              {country.flag ? (
                <img
                  src={country.flag}
                  alt={country.country}
                  className="w-16 h-11 object-cover rounded-md border border-gray-200 dark:border-gray-700 shadow-xs shrink-0"
                />
              ) : (
                <div className="w-16 h-11 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center text-2xl font-bold">
                  🏳️
                </div>
              )}
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
                    {country.country}
                  </h2>
                  {country.iso2 && (
                    <span className="px-2 py-0.5 text-xs font-semibold bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 rounded">
                      {country.iso2}
                    </span>
                  )}
                  {country.iso3 && (
                    <span className="px-2 py-0.5 text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">
                      {country.iso3}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                  Регіон: <span className="font-medium text-gray-700 dark:text-gray-300">{country.continent}</span>
                  {country.lat !== undefined && country.long !== undefined && (
                    <span className="ml-3 text-xs text-gray-400">
                      Координати: {country.lat.toFixed(1)}°N, {country.long.toFixed(1)}°E
                    </span>
                  )}
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right border-t sm:border-t-0 pt-4 sm:pt-0 border-gray-100 dark:border-gray-800 w-full sm:w-auto">
              <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold block">
                Населення
              </span>
              <span className="text-2xl font-bold font-mono text-gray-900 dark:text-gray-100">
                {country.population ? country.population.toLocaleString() : 'Невідомо'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xs">
              <h4 className="text-xs uppercase font-semibold text-gray-500 dark:text-gray-400">
                Усього випадків
              </h4>
              <p className="text-2xl font-bold font-mono text-gray-900 dark:text-gray-100 mt-2">
                {country.cases.toLocaleString()}
              </p>
              <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                +{country.todayCases.toLocaleString()} нових за добу
              </p>
            </div>

            <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xs">
              <h4 className="text-xs uppercase font-semibold text-gray-500 dark:text-gray-400">
                Одужало
              </h4>
              <p className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-2">
                {country.recovered.toLocaleString()}
              </p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                +{country.todayRecovered.toLocaleString()} за добу
              </p>
            </div>

            <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xs">
              <h4 className="text-xs uppercase font-semibold text-gray-500 dark:text-gray-400">
                Летальні випадки
              </h4>
              <p className="text-2xl font-bold font-mono text-rose-600 dark:text-rose-400 mt-2">
                {country.deaths.toLocaleString()}
              </p>
              <p className="text-xs text-rose-600 dark:text-rose-400 mt-1">
                +{country.todayDeaths.toLocaleString()} за добу
              </p>
            </div>

            <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xs">
              <h4 className="text-xs uppercase font-semibold text-gray-500 dark:text-gray-400">
                Активні / Критичні
              </h4>
              <p className="text-2xl font-bold font-mono text-blue-600 dark:text-blue-400 mt-2">
                {country.active.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Критичних: <span className="font-semibold text-rose-500">{country.critical.toLocaleString()}</span>
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 border-b border-gray-100 dark:border-gray-800 pb-3">
              Розширена статистика тестування та відносні показники
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/60">
                <span className="text-xs text-gray-500 dark:text-gray-400 block">Проведено тестів</span>
                <span className="text-lg font-bold font-mono text-gray-900 dark:text-gray-100">
                  {country.tests ? country.tests.toLocaleString() : 'Немає даних'}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/60">
                <span className="text-xs text-gray-500 dark:text-gray-400 block">Тестів на 1 млн населення</span>
                <span className="text-lg font-bold font-mono text-gray-900 dark:text-gray-100">
                  {country.testsPerOneMillion ? country.testsPerOneMillion.toLocaleString() : '0'}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/60">
                <span className="text-xs text-gray-500 dark:text-gray-400 block">Випадків на 1 млн</span>
                <span className="text-lg font-bold font-mono text-amber-600 dark:text-amber-400">
                  {country.casesPerOneMillion ? country.casesPerOneMillion.toLocaleString() : '0'}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/60">
                <span className="text-xs text-gray-500 dark:text-gray-400 block">Смертей на 1 млн</span>
                <span className="text-lg font-bold font-mono text-rose-600 dark:text-rose-400">
                  {country.deathsPerOneMillion ? country.deathsPerOneMillion.toLocaleString() : '0'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
