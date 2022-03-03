import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import { Location } from "./types";
import { fetchAllLocations } from "./characters.api"
import { RootState } from "../../../app/store";

/* A cache for location data */
export const name = "location";

export interface State {
    status: "idle" | "loading" | "failed"
    locations: Location[]
}

const initialState: State = {
    status: 'idle',
    locations: []
};

export const getAllLocations = createAsyncThunk(
    `${name}/getAllLocations`,
    fetchAllLocations
);

export const slice = createSlice({
    name,
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
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

export const { reducer } = slice;

export const selectAllLocations = (state: RootState) => state[name].locations;
