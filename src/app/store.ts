import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import {
    NotesSlice,
    DetailSlice,
    SearchSlice,
    LocationsSlice,
    CharactersSlice
} from "../features/catalog/ducks";

export const store = configureStore({
    reducer: {
        [NotesSlice.name]: NotesSlice.reducer,
        [DetailSlice.name]: DetailSlice.reducer,
        [SearchSlice.name]: SearchSlice.reducer,
        [LocationsSlice.name]: LocationsSlice.reducer,
        [CharactersSlice.name]: CharactersSlice.reducer
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
