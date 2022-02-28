import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import { ducks as counterDucks } from "../features/counter";
import { ducks as charactersDucks } from "../features/characters";

export const store = configureStore({
    reducer: {
        [counterDucks.name]: counterDucks.slice.reducer,
        [charactersDucks.name]: charactersDucks.slice.reducer
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
