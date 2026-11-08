import { Link, NavLink } from 'react-router';
import { useTheme } from '../../context';
import { Button } from '../common/Button';

export interface HeaderProps {
  title: string;
  subtitle?: string;
}

export const Header = ({ title, subtitle }: HeaderProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 py-4 px-6 md:px-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link to="/" className="group flex items-center gap-2">
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
                {title}
              </h1>
              {subtitle && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {subtitle}
                </p>
              )}
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <nav className="flex items-center gap-2 text-sm">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-semibold'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`
              }
            >
              Дашборд
            </NavLink>
          </nav>

          <Button
            type="button"
            variant="outline"
            onClick={toggleTheme}
            aria-label="Змінити тему"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <span>{theme === 'dark' ? '☀️' : '🌙'}</span>
            <span className="hidden sm:inline">{theme === 'dark' ? 'Світла тема' : 'Темна тема'}</span>
          </Button>
        </div>
      </div>
    </header>
  );
};
