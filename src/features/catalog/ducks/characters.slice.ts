import {
    PayloadAction,
    createSlice,
    createSelector
} from "@reduxjs/toolkit";

import { Character } from "./types";
import { fetchCharactersByIds, fetchAllCharacterIds } from "./characters.api"
import { RootState, AppThunk, AppDispatch } from "../../../app/store";

/* A cache of all the characters downloaded */
export const name = "characters";

interface CharacterMap {
    [key: string]: Character
}

interface CharacterIdMap {
    [key: string]: string
}

export interface State {
    ids: CharacterIdMap
    characters: CharacterMap
}

const initialState: State = {
    ids: {},
    characters: {}
};

export function cacheAllCharacterIds(): AppThunk {
    return async function cacheAllCharacterIdsThunk(dispatch: AppDispatch) {
        const characterIds = await fetchAllCharacterIds();
        dispatch(cacheCharacterIds(characterIds));
    };
}

export function getCharacters(ids: string[]): AppThunk {
    return async function getCharacterByIdThunk(
        dispatch: AppDispatch,
        getState: () => RootState
    ) {
        const characters = selectCharacters(getState());
        const lookupCharacterIds = ids.filter(id => !Object.keys(characters).includes(id));

        if (lookupCharacterIds.length) {
            const characters = await fetchCharactersByIds(lookupCharacterIds);
            dispatch(addCharacters(characters));
        }
    };
}

export const slice = createSlice({
    name,
    initialState,
    reducers: {
        cacheCharacterIds(state: State, action: PayloadAction<string[]>) {
            state.ids = action.payload.reduce((acc, id) => ({
                ...acc,
                [id]: id
            }), {});
        },
        addCharacters(state: State, action: PayloadAction<Character[]>) {
            const cachedCharacterIds = Object.keys(state.characters);

            action.payload
                .filter(ch => !cachedCharacterIds.includes(ch.id))
                .forEach((character: Character) => {
                    state.characters[character.id] = character;
                });
        }
    }
});

export const { addCharacters, cacheCharacterIds } = slice.actions;
export const { reducer } = slice;

export const selectCharacters = (state: RootState) => state[name].characters;
export const selectCharacterIds = (state: RootState) => state[name].ids;
export const selectCharactersList = createSelector(
    selectCharacters,
    (characters: CharacterMap) => Object.values(characters)
);
export const selectCharacterById = createSelector(
    selectCharacters,
    (_: RootState, characterId: string) => characterId,
    (characters: CharacterMap, id: string) => characters[id]
);
export const selectCharactersByIds = createSelector(
    selectCharacters,
    (_: RootState, characterIds: string[]) => characterIds,
    (characters: CharacterMap, ids: string[]) => (
        Object.keys(characters)
            .filter(cid => ids.includes(cid))
            .map(cid => characters[cid])
    )
);
