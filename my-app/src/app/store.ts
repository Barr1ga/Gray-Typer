import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import criteriaReducer from "../features/criteria/criteriaSlice";
import keyboardReducer from "../features/keyboard/keyboardSlice";

export const store = configureStore({
  reducer: {
    criterias: criteriaReducer,
    keyboard: keyboardReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
