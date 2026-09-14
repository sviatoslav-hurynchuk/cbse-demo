export interface HeaderProps {
  title: string;
  subtitle?: string;
}

export const Header = ({ title, subtitle }: HeaderProps) => {
  return (
    <header className="border-b border-gray-200 bg-white py-6 px-8">
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
    </header>
  );
};
