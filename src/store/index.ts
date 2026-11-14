import { configureStore } from '@reduxjs/toolkit';
import { themeReducer } from './slices/themeSlice';
import { dashboardReducer } from './slices/dashboardSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    dashboard: dashboardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export * from './slices/themeSlice';
export * from './slices/dashboardSlice';
