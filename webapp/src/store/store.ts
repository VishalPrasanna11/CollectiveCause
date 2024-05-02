// src/app/store.ts
import { configureStore, combineReducers, ThunkAction, Action } from '@reduxjs/toolkit';
import fundRaisingFormReducer from '../reducers/fundrasierslice'; // Adjust import path for your reducer
import authReducer from '../reducers/authslice'; // Import the authSlice

// Combine reducers
const rootReducer = combineReducers({
  fundRaisingForm: fundRaisingFormReducer,
  auth: authReducer, // Add the auth reducer here
  // Add more reducers here if needed
});

// Define RootState type for useSelector
export type RootState = ReturnType<typeof rootReducer>;

// Define AppDispatch type based on the store dispatch function
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

// Configure the Redux store
const store = configureStore({
  reducer: rootReducer,
  // You can add middleware and enhancers here if necessary
});

export default store;
export type AppDispatch = typeof store.dispatch;
