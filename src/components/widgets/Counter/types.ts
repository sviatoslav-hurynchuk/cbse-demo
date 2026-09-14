export interface CounterProps {
  title?: string;
  initialValue?: number;
  step?: number;
  min?: number;
  max?: number;
  unit?: string; // наприклад, 'днів' (період історичного графіка)
}
