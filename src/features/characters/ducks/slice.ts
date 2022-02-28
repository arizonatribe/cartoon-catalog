import {
    Dispatch,
    createSlice,
    PayloadAction,
    createAsyncThunk,
} from "@reduxjs/toolkit";

import { fetchCharactersByPage, fetchCharacterById } from "./api";
import { Character, FilterCharacter, FilterLocation } from "./types";
import { RootState, AppThunk } from "../../../app/store";

export const name = "characters";

export interface State {
    status: "idle" | "loading" | "failed"
    detail?: Character
    search: {
        page: number,
        matches: Character[],
        filter?: FilterCharacter | FilterLocation
    }
}

const initialState: State = {
    status: 'idle',
    search: {
        page: 0,
        matches: []
    }
};

export const searchCharacters = createAsyncThunk(
    `${name}/searchCharacters`,
    fetchCharactersByPage
);

export const viewCharacter = createAsyncThunk(
    `${name}/viewCharacter`,
    fetchCharacterById
);

export function nextPageOfCharacters(): AppThunk {
    return async function nextPageOfCharactersThunk(
        dispatch: Dispatch,
        getState: () => RootState
    ) {
        const currentPage = selectCurrentPage(getState());
        dispatch(nextPage());
        const characters = await fetchCharactersByPage(currentPage + 1);
        dispatch(addCharacters(characters));
    };
}

export const slice = createSlice({
    name,
    initialState,
    reducers: {
        nextPage(state: State) {
            state.search.page += 1;
        },
        prevPage(state: State) {
            state.search.page -= 1;
        },
        addCharacters(state: State, action: PayloadAction<Character[]>) {
            action.payload.forEach((character: Character) => {
                state.search.matches.push(character);
            });
        },
        closeDetail(state: State) {
            state.detail = undefined;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(
                searchCharacters.pending,
                (state: State) => {
                    state.status = "loading";
                }
            )
            .addCase(
                searchCharacters.fulfilled,
                (state: State, action: PayloadAction<Character[]>) => {
                    state.status = "idle";
                    state.search.matches = action.payload;
                }
            )
            .addCase(
                viewCharacter.pending,
                (state: State) => {
                    state.status = "loading";
                    state.detail = undefined;
                }
            )
            .addCase(
                viewCharacter.rejected,
                (state: State) => {
                    state.status = "failed";
                    state.detail = undefined;
                }
            )
            .addCase(
                viewCharacter.fulfilled,
                (state: State, action: PayloadAction<Character>) => {
                    state.status = "idle";
                    state.detail = action.payload;
                }
            )
    }
});

export const { nextPage, prevPage, addCharacters, closeDetail } = slice.actions;
export const { reducer } = slice;

/*
 * -----------------------
 * |      SELECTORS      |
 * -----------------------
 */

export const selectCharacters = (state: RootState) => state[name].search.matches;
export const selectCurrentPage = (state: RootState) => state[name].search.page;
export const selectCharacterDetail = (state: RootState) => state[name].detail;
