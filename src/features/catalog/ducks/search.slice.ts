import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";

import { fetchLocationsByFilter, fetchCharactersByFilter } from "./characters.api"
import { selectCharacters, getCharacters } from "./characters.slice";
import { Character, FilterCharacter, FilterLocation } from "./types";
import { RootState, AppThunk, AppDispatch } from "../../../app/store";

export const name = "search";

interface SearchItemMap {
    [key: string]: string
}

export interface State {
    status: "idle" | "loading" | "failed"
    kind: "location" | "character" | ""
    page: number
    searchText: string
    matches: SearchItemMap
    filter: FilterCharacter | FilterLocation,
}

const initialState: State = {
    status: "idle",
    searchText: "",
    page: 0,
    kind: "",
    filter: {},
    matches: {}
}

export function searchCharactersByLocation(filter: FilterLocation): AppThunk {
    return async function searchCharactersByLocationThunk(dispatch: AppDispatch) {
        dispatch(setSearchFilter({ filter, kind: "location" }));
        dispatch(setLoadingStatus("loading"));
        const characterIds = await fetchLocationsByFilter(filter, 1);
        dispatch(setSearchMatches(characterIds));
        dispatch(getCharacters(characterIds));
        dispatch(setLoadingStatus("idle"));
    };
}

export function searchCharacters(filter: FilterCharacter): AppThunk {
    return async function searchCharactersByLocationThunk(dispatch: AppDispatch) {
        dispatch(setSearchFilter({ filter, kind: "character" }));
        dispatch(setLoadingStatus("loading"));
        const characterIds = await fetchCharactersByFilter(filter, 1);
        dispatch(setSearchMatches(characterIds));
        dispatch(getCharacters(characterIds));
        dispatch(setLoadingStatus("idle"));
    };
}

export function nextPageOfCharacters(): AppThunk {
    return async function nextPageOfCharactersThunk(
        dispatch: AppDispatch,
        getState: () => RootState
    ) {
        const currentPage = selectCurrentPage(getState());

        dispatch(nextPage());

        const filter = selectSearchFilter(getState());
        const kind = selectSearchFilterKind(getState());

        dispatch(setLoadingStatus("loading"));

        const characterIds = (kind === "location")
            ? await fetchLocationsByFilter(filter, currentPage + 1)
            : await fetchCharactersByFilter(filter, currentPage + 1);

        dispatch(getCharacters(characterIds));
        dispatch(appendSearchMatches(characterIds));
        dispatch(setLoadingStatus("idle"));
    };
}

export const slice = createSlice({
    name,
    initialState,
    reducers: {
        setSearchFilter(
            state: State,
            action: PayloadAction<{
                kind: "location" | "character" | "",
                filter: FilterLocation|FilterCharacter
            }>
        ) {
            state.filter = action.payload.filter;
            state.kind = action.payload.kind;
        },
        clearSearchFilter(state: State) {
            state.filter = {};
            state.kind = "";
        },
        setLoadingStatus(state: State, action: PayloadAction<"loading" | "idle" | "failed">) {
            state.status = action.payload;
        },
        nextPage(state: State) {
            state.page += 1;
        },
        prevPage(state: State) {
            state.page -= 1;
        },
        appendSearchMatches(state: State, action: PayloadAction<string[]>) {
            action.payload.forEach(characterId => {
                state.matches[characterId] = characterId;
            });
        },
        setSearchMatches(state: State, action: PayloadAction<string[]>) {
            state.matches = {};
            action.payload.forEach(characterId => {
                state.matches[characterId] = characterId;
            });
        }
    }
});

export const { nextPage, prevPage, setLoadingStatus, clearSearchFilter, setSearchFilter, setSearchMatches, appendSearchMatches } = slice.actions;
export const { reducer } = slice;

export const selectSearchFetchStatus = (state: RootState) => state[name].status;
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
export const selectSearchFilterKind = (state: RootState) => state[name].kind;
export const selectSearchFilter = (state: RootState) => state[name].filter;
export const selectSearchText = createSelector(
    selectSearchFilter,
    (filter: FilterLocation | FilterCharacter) => (
        Object.values(filter ?? {}).filter(v => v != null && v.trim()).join(" ")
    )
);
