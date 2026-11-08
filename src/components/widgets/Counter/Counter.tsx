import type { CounterProps } from './types';
import { useState } from 'react';
import { Button } from '../../common/Button';

export const Counter = ({
  title = 'Період аналізу динаміки',
  initialValue = 14,
  step = 7,
  unit = 'днів',
  min = 1,
  max = 90,
}: CounterProps) => {
  const [count, setCount] = useState(initialValue);

  function handleDecrease() {
    setCount((prev) => prev - step);
  }

  function handleIncrease() {
    setCount((prev) => prev + step);
  }

  function handleReset() {
    setCount(initialValue);
  }

  return (
    <div className="p-5 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 transition-colors">
      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-1">{title}</h4>
      <div className="my-3 text-3xl font-bold text-gray-900 dark:text-gray-100">
        {count} <span className="text-base font-normal text-gray-500 dark:text-gray-400">{unit}</span>
      </div>
      <p className="text-xs text-gray-400 dark:text-gray-500">
        Крок: ±{step} {unit} (діапазон: {min}–{max})
      </p>
      <div className="flex gap-2 mt-4">
        <Button
          onClick={handleDecrease}
          variant="secondary"
          disabled={count <= min}
        >
          − {step} {unit}
        </Button>

        <Button
          onClick={handleIncrease}
          variant="primary"
          disabled={count >= max}
        >
          + {step} {unit}
        </Button>

        <Button
          onClick={handleReset}
          variant="outline"
          disabled={count === initialValue}
        >
          Скинути
        </Button>
      </div>
    </div>
  );
};
