import { Link } from 'react-router';
import { Button } from '../components/common/Button';

export function NotFoundPage() {
  return (
    <div className="py-16 text-center space-y-4 max-w-md mx-auto">
      <div className="w-16 h-16 mx-auto rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center text-2xl font-bold">
        404
      </div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        Сторінку не знайдено
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Шлях, який ви намагаєтеся відкрити, не існує або був переміщений.
      </p>
      <div className="pt-2">
        <Link to="/">
          <Button variant="primary">Повернутися на дашборд</Button>
        </Link>
      </div>
    </div>
  );
}
