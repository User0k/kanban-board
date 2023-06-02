import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { api } from '../services/api';
import errorReducer from './slices/errorSlice';
import columnSetReducer from './slices/columnSetSlice';

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  errorReducer,
  columnSetReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
