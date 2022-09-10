import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import criteriaReducer from "../features/criteria/criteriaSlice";
import keyboardReducer from "../features/keyboard/keyboardSlice";
import resultReducer from "../features/result/resultSlice";

export const store = configureStore({
  reducer: {
    criterias: criteriaReducer,
    keyboard: keyboardReducer,
    result: resultReducer,
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
