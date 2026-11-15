import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleTheme } from '../../store/slices/themeSlice';
import { Button } from '../common/Button';

export interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export const Header = ({
  title = 'disease.sh dashboard',
  subtitle = 'Lab05',
}: HeaderProps) => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.theme);

  return (
    <header className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-6 md:px-8 h-16 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <span>{title}</span>
            <span className="text-xs font-mono font-normal bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 px-2 py-0.5 rounded-full">
              {subtitle}
            </span>
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => dispatch(toggleTheme())}
            className="text-xs px-3 py-1.5"
            aria-label="Перемкнути тему"
          >
            {theme === 'dark' ? 'Світла тема' : 'Темна тема'}
          </Button>
        </div>
      </div>
    </header>
  );
};
