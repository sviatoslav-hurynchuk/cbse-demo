import type { CounterProps } from './types';

export const Counter = ({
  title = 'Період аналізу динаміки',
  initialValue = 14,
  step = 7,
  unit = 'днів',
  min = 1,
  max = 90,
}: CounterProps) => {
  // TODO: Додати локальний стан (useState) для збереження кількості днів
  // TODO: Реалізувати обробники кнопок (- step, + step, reset) з перевіркою min/max

  return (
    <div className="p-5 rounded-xl border border-dashed border-gray-300 bg-white">
      <span className="text-xs text-gray-400 font-mono">[Counter Widget Skeleton]</span>
      <h4 className="text-sm font-medium text-gray-700 mt-1">{title}</h4>
      <div className="my-3 text-3xl font-bold text-gray-900">
        {initialValue} <span className="text-base font-normal text-gray-500">{unit}</span>
      </div>
      <p className="text-xs text-gray-400">
        Крок: ±{step} {unit} (діапазон: {min}–{max})
      </p>
      <div className="flex gap-2 mt-3">
        {/* TODO: Кнопки зменшення, скидання та збільшення періоду */}
      </div>
    </div>
  );
};
