import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../features/Login/loginSlice';

export const store = configureStore({
  reducer: {
    login: loginReducer,
  },
});
