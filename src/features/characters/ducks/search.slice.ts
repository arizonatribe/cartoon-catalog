import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";

import { fetchLocationsByFilter, fetchCharactersByPage, fetchCharactersByFilter } from "./characters.api"
import { addCharacters, selectCharacters, selectCharactersByIds , getCharacters } from "./characters.slice";
import { Character, FilterCharacter, FilterLocation } from "./types";
import { RootState, AppThunk, AppDispatch } from "../../../app/store";

export const name = "search";

interface SearchItemMap {
    [key: string]: string
}

export interface State {
    status: "idle" | "loading" | "failed"
    page: number
    searchText: string
    matches: SearchItemMap
    filter: FilterCharacter | FilterLocation,
}

const initialState: State = {
    status: "idle",
    searchText: "",
    page: 0,
    filter: {},
    matches: {}
}

export function searchCharactersByLocation(filter: FilterLocation): AppThunk {
    return async function searchCharactersByLocationThunk(dispatch: AppDispatch) {
        dispatch(setSearchFilter(filter));
        const characterIds = await fetchLocationsByFilter(filter, 1);
        dispatch(setSearchMatches(characterIds));
        dispatch(getCharacters(characterIds));
    };
}

export function searchCharacters(filter: FilterLocation): AppThunk {
    return async function searchCharactersByLocationThunk(dispatch: AppDispatch) {
        dispatch(setSearchFilter(filter));
        const characterIds = await fetchCharactersByFilter(filter, 1);
        dispatch(setSearchMatches(characterIds));
        dispatch(getCharacters(characterIds));
    };
}

export function nextPageOfCharacters(): AppThunk {
    return async function nextPageOfCharactersThunk(
        dispatch: AppDispatch,
        getState: () => RootState
    ) {
        const currentPage = selectCurrentPage(getState());
        const filter = selectSearchFilter(getState())

        dispatch(nextPage());

        const characterIds = await fetchLocationsByFilter(filter, currentPage + 1);
        dispatch(setSearchMatches(characterIds));
        dispatch(getCharacters(characterIds));
    };
}

export const slice = createSlice({
    name,
    initialState,
    reducers: {
        setSearchFilter(state: State, action: PayloadAction<FilterLocation|FilterCharacter>) {
            state.filter = action.payload;
        },
        clearSearchFilter(state: State) {
            state.filter = {};
        },
        nextPage(state: State) {
            state.page += 1;
        },
        prevPage(state: State) {
            state.page -= 1;
        },
        setSearchMatches(state: State, action: PayloadAction<string[]>) {
            state.matches = {};
            action.payload.forEach(characterId => {
                state.matches[characterId] = characterId;
            });
        }
    }
});

export const { nextPage, prevPage, clearSearchFilter, setSearchFilter, setSearchMatches } = slice.actions;
export const { reducer } = slice;

export const selectMatchIds = (state: RootState) => Object.keys(state[name].matches);
export const selectSearchMatches = createSelector(
    selectCharacters,
    (state: RootState) => Object.keys(state[name].matches),
    (characters: { [key: string]: Character }, ids: string[]) => 
        Object.keys(characters ?? {})
            .filter(cid => ids.includes(cid))
            .map(cid => characters[cid])
);
export const selectCurrentPage = (state: RootState) => state[name].page;
export const selectSearchFilter = (state: RootState) => state[name].filter;
export const selectSearchText = createSelector(
    selectSearchFilter,
    (filter: FilterLocation | FilterCharacter) => (
        Object.values(filter ?? {}).filter(v => v != null && v.trim()).join(" ")
    )
);
