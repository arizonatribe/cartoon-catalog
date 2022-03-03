import {
    Dispatch,
    createSlice,
    PayloadAction,
    createSelector
} from "@reduxjs/toolkit";

import { Note } from "./types";
import { createNote, updateNote, fetchNote } from "./notes.api";
import { RootState, AppThunk } from "../../../app/store";

export const name = "notes";

interface NotesMap {
    [key: string]: string
}

export interface State {
    notes: NotesMap
}

const initialState: State = {
    notes: {}
};

export function createCharacterNote(text: string, characterId: string): AppThunk {
    return async function createCharacterNoteThunk(
        dispatch: Dispatch,
        getState: () => RootState
    ) {
        const existingNoteText = await fetchNote(characterId);

        const note = existingNoteText != null
            ? await updateNote({ text, characterId })
            : await createNote({ text, characterId });

        dispatch(addNote(note));
    };
}

export function viewNote(characterId: string): AppThunk {
    return async function viewNoteThunk(
        dispatch: Dispatch,
        getState: () => RootState
    ) {
        const allNotes = selectAllNotes(getState());
        const text = allNotes[characterId];

        if (text != null) {
            dispatch(addNote({ characterId, text }));
        } else {
            const newNote = await fetchNote(characterId);
            dispatch(addNote(newNote));
        }
    };
}

export const slice = createSlice({
    name,
    initialState,
    reducers: {
        addNote(state: State, action: PayloadAction<Note>) {
            state.notes[action.payload.characterId] = action.payload.text;
        }
    }
});

export const { addNote } = slice.actions;
export const { reducer } = slice;

export const selectAllNotes = (state: RootState) => state[name].notes;
export const selectListOfAllNotes = createSelector(
    selectAllNotes,
    (notes: NotesMap) => Object.entries(notes).map(([characterId, text]) => ({ characterId, text }))
);
export const selectNoteDetail = createSelector(
    selectAllNotes,
    (_: RootState, characterId: string) => characterId,
    (notes: NotesMap, characterId: string) => notes[characterId]
);
