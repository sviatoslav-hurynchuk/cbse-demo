import { useState, useEffect, useCallback } from 'react';

export interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useFetch<T>(fetcher: (signal?: AbortSignal) => Promise<T>): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState<number>(0);

  const refetch = useCallback(() => {
    setReloadKey((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const run = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await fetcher(controller.signal);
        if (!controller.signal.aborted) {
          setData(result);
        }
      } catch (err: unknown) {
        if (err instanceof Error && (err.name === 'AbortError' || controller.signal.aborted)) {
          return;
        }
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Помилка завантаження даних');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    void run();

    return () => {
      controller.abort();
    };
  }, [fetcher, reloadKey]);

  return { data, loading, error, refetch };
}
