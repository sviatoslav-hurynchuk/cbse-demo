import { configureStore } from '@reduxjs/toolkit';
import { themeReducer } from './slices/themeSlice';
import { dashboardReducer } from './slices/dashboardSlice';
import { storageMiddleware } from './middleware/storageMiddleware';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    dashboard: dashboardReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(storageMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export * from './slices/themeSlice';
export * from './slices/dashboardSlice';
