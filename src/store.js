import { configureStore } from '@reduxjs/toolkit';
import { worksApi } from './Services/worksApi';


export const store = configureStore({
  reducer: {
    [worksApi.reducerPath]: worksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(worksApi.middleware),
});
