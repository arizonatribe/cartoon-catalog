import { Dispatch, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Character } from "./types";
import { addCharacters, selectCharacterById } from "./characters.slice";
import { fetchCharacterById } from "./characters.api";
import { AppThunk, RootState } from "../../../app/store";

/* A detail view for a single character at a time */
export const name = "detail";

export interface State {
    detail?: Character
}

const initialState: State = {};

export function viewCharacter(characterId: string): AppThunk {
    return async function viewCharacterThunk(
        dispatch: Dispatch,
        getState: () => RootState
    ) {
        let existingCharacter = selectCharacterById(getState(), characterId);

        if (!existingCharacter) {
            existingCharacter = await fetchCharacterById(characterId);
            dispatch(addCharacters([existingCharacter]));
        }

        dispatch(showDetail(existingCharacter));
    };
}


export const slice = createSlice({
    name,
    initialState,
    reducers: {
        showDetail(state: State, action: PayloadAction<Character>) {
            state.detail = action.payload;
        },
        closeDetail(state: State) {
            state.detail = undefined;
        },
    }
});

export const { closeDetail, showDetail } = slice.actions;
export const { reducer } = slice;

export const selectCharacterDetail = (state: RootState) => state[name].detail;
