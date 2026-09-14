import type { ToggleProps } from './types';

export const Toggle = ({
  label = 'Режим відображення показників',
  optionA = 'Загальна кількість',
  optionB = 'На 1 млн населення',
  initialActive = false,
}: ToggleProps) => {
  // TODO: Додати локальний стан (useState) перемикача
  // TODO: Реалізувати перемикання між optionA та optionB з умовним рендерингом

  return (
    <div className="p-5 rounded-xl border border-dashed border-gray-300 bg-white">
      <span className="text-xs text-gray-400 font-mono">[Toggle Widget Skeleton]</span>
      <h4 className="text-sm font-medium text-gray-700 mt-1">{label}</h4>
      <div className="mt-3 inline-flex items-center gap-2 p-1 bg-gray-100 rounded-lg text-sm">
        <span className={!initialActive ? 'font-semibold text-gray-900' : 'text-gray-500'}>
          {optionA}
        </span>
        <span className="text-gray-300">/</span>
        <span className={initialActive ? 'font-semibold text-gray-900' : 'text-gray-500'}>
          {optionB}
        </span>
      </div>
      {/* TODO: Інтерактивний Toggle Button */}
    </div>
  );
};
