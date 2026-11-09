import type { ToggleProps } from './types';
import { useState } from 'react';

export const Toggle = ({
  label = 'Режим відображення показників',
  optionA = 'Загальна кількість',
  optionB = 'На 1 млн населення',
  initialActive = false,
}: ToggleProps) => {
  const [isActive, setIsActive] = useState(initialActive);

  return (
    <div className="p-5 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 transition-colors">
      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-1">{label}</h4>
      <div className="mt-3 inline-flex items-center gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm">
        <button
          onClick={() => setIsActive(false)}
          className={`px-3 py-1 rounded-md transition cursor-pointer ${
            !isActive
              ? 'bg-white dark:bg-gray-700 shadow-xs font-semibold text-gray-900 dark:text-gray-100'
              : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          {optionA}
        </button>
        <button
          onClick={() => setIsActive(true)}
          className={`px-3 py-1 rounded-md transition cursor-pointer ${
            isActive
              ? 'bg-white dark:bg-gray-700 shadow-xs font-semibold text-gray-900 dark:text-gray-100'
              : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          {optionB}
        </button>
      </div>
      <div className="mt-3 p-2.5 rounded-lg bg-gray-50 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-300">
        {isActive ? (
          <p>відносні показники (розраховано на 1,000,000 населення).</p>
        ) : (
          <p>точні абсолютні значення за весь час спостережень.</p>
        )}
      </div>
    </div>
  );
};
