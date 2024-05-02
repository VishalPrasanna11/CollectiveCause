// src/features/auth/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from "@auth0/auth0-react";
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import type { RootState } from '../store/store';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const getUser = (state: RootState) => state.auth.user;

// Use throughout your application instead of plain `useSelector`
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
