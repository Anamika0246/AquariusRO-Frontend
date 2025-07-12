import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import themeReducer from './slices/themeSlice';
import { checkAuth } from './slices/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
  },
});

// Check authentication when the store is created
store.dispatch(checkAuth());

export const storeState = store.getState();
export const storeDispatch = store.dispatch;
