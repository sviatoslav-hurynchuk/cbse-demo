import { BrowserRouter, Routes, Route } from 'react-router';
import { ThemeProvider, DashboardProvider } from './context';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { DashboardPage, CountryDetailPage, NotFoundPage } from './pages';

export function App() {
  return (
    <ThemeProvider>
      <DashboardProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DashboardLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="country/:code" element={<CountryDetailPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </DashboardProvider>
    </ThemeProvider>
  );
}

export default App;
