import type { CounterProps } from './types';
import {useState} from "react";
import {Button} from "../../common/Button.tsx";

export const Counter = ({
  title = 'Період аналізу динаміки',
  initialValue = 14,
  step = 7,
  unit = 'днів',
  min = 1,
  max = 90,
}: CounterProps) => {
    const [count, setCount] = useState(initialValue);

    function HandleDecrease() {
        setCount(prev => prev - step);
    }

    function HandleIncrease() {
        setCount(prev => prev + step);
    }

    function HandleReset() {
        setCount(initialValue);
    }

    return (
    <div className="p-5 rounded-xl border border-dashed border-gray-300 bg-white">
      <h4 className="text-sm font-medium text-gray-700 mt-1">{title}</h4>
      <div className="my-3 text-3xl font-bold text-gray-900">
        {count} <span className="text-base font-normal text-gray-500">{unit}</span>
      </div>
      <p className="text-xs text-gray-400">
        Крок: ±{step} {unit} (діапазон: {min}–{max})
      </p>
        <div className="flex gap-2 mt-4">
            <Button
                onClick={HandleDecrease}
                variant="secondary"
                disabled={count <= min}
            >
                − {step} {unit}
            </Button>

            <Button
                onClick={HandleIncrease}
                variant="primary"
                disabled={count >= max}
            >
                + {step} {unit}
            </Button>

            <Button
                onClick={HandleReset}
                variant="outline"
            >
                Скинути
            </Button>
        </div>
    </div>
  );
};
