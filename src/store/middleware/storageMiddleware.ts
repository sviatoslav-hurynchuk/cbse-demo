import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { toggleTheme, setTheme } from '../slices/themeSlice';
import { toggleFavorite } from '../slices/dashboardSlice';
import type { RootState } from '../index';

export const storageMiddleware = createListenerMiddleware();

storageMiddleware.startListening({
  matcher: isAnyOf(toggleTheme, setTheme),
  effect: (_, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    const { theme } = state.theme;
    localStorage.setItem('cop_theme', theme);

    const root = document.getElementById('root');
    if (root) {
      root.classList.toggle('dark', theme === 'dark');
    }
  },
});

storageMiddleware.startListening({
  actionCreator: toggleFavorite,
  effect: (_, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    try {
      localStorage.setItem('cop_favorites', JSON.stringify(state.dashboard.favorites));
    } catch {
      // LocalStorage quota edge-case
    }
  },
});
