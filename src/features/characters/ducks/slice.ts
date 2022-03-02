import {
    Dispatch,
    createSlice,
    PayloadAction,
    createAsyncThunk,
} from "@reduxjs/toolkit";

import { fetchAllLocations, fetchLocationsByFilter, fetchCharactersByPage, fetchCharacterById } from "./api";
import { Character, Location, FilterCharacter, FilterLocation } from "./types";
import { RootState, AppThunk } from "../../../app/store";

export const name = "characters";

export interface State {
    status: "idle" | "loading" | "failed"
    detail?: Character
    locations: Location[]
    search: {
        page: number,
        matches: Character[],
        filter?: FilterCharacter | FilterLocation
    }
}

const initialState: State = {
    status: 'idle',
    locations: [],
    search: {
        page: 0,
        matches: []
    }
};

export const viewCharacter = createAsyncThunk(
    `${name}/viewCharacter`,
    fetchCharacterById
);

export function searchCharactersByLocation(filter: FilterLocation): AppThunk {
    return async function searchCharactersByLocationThunk(
        dispatch: Dispatch,
        getState: () => RootState
    ) {
        try {
            const locations = await fetchLocationsByFilter(filter);
            const characters: Character[] = [];
            locations.forEach(({ residents }) => {
                characters.push(...residents);
            });
            dispatch(searchCharacters(characters));
        } catch (err) {
            dispatch(searchCharacters([]));
        }
    };
}

export const getAllLocations = createAsyncThunk(
    `${name}/getAllLocations`,
    fetchAllLocations
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
        searchCharacters(state: State, action: PayloadAction<Character[]>) {
            state.search.matches = action.payload;
        },
        closeDetail(state: State) {
            state.detail = undefined;
        },
    },
    extraReducers(builder) {
        builder
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
            .addCase(
                getAllLocations.pending,
                (state: State) => {
                    state.status = "loading";
                    state.locations = [];
                }
            )
            .addCase(
                getAllLocations.rejected,
                (state: State) => {
                    state.status = "failed";
                    state.locations = [];
                }
            )
            .addCase(
                getAllLocations.fulfilled,
                (state: State, action: PayloadAction<Location[]>) => {
                    state.status = "idle";
                    state.locations = action.payload;
                }
            )
    }
});

export const { nextPage, prevPage, addCharacters, searchCharacters, closeDetail } = slice.actions;
export const { reducer } = slice;

/*
 * -----------------------
 * |      SELECTORS      |
 * -----------------------
 */

export const selectCharacters = (state: RootState) => state[name].search.matches;
export const selectCurrentPage = (state: RootState) => state[name].search.page;
export const selectCharacterDetail = (state: RootState) => state[name].detail;
export const selectAllLocations = (state: RootState) => state[name].locations;
