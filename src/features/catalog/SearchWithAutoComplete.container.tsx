import React, { useEffect } from "react";

import { FetchStatus, LocationsSlice, SearchSlice, Location, CharactersSlice } from "./ducks";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { SearchWithAutoComplete } from "./SearchWithAutoComplete";

export function SearchWithAutoCompleteContainer() {
    const dispatch = useAppDispatch();
    const locations = useAppSelector<Location[]>(LocationsSlice.selectAllLocations);
    const searchText = useAppSelector<string>(SearchSlice.selectSearchText);
    const locationsFetchStatus = useAppSelector<FetchStatus>(LocationsSlice.selectLocationsFetchStatus);
    const searchFetchStatus = useAppSelector<FetchStatus>(SearchSlice.selectSearchFetchStatus);
    const charactersFetchStatus = useAppSelector<FetchStatus>(CharactersSlice.selectCharacterFetchStatus);

    const handleSearch = (name?: string, type?: string) => {
        const filter = {
            ...(name && { name }),
            ...(type && { type })
        };
        dispatch(SearchSlice.searchCharactersByLocation(filter));
    };

    useEffect(() => {
        dispatch(LocationsSlice.getAllLocations());
    }, [dispatch]);

    return (
        <SearchWithAutoComplete
          text={searchText}
          handleSearch={handleSearch}
          suggestions={locations}
          isLoading={[
            locationsFetchStatus,
            searchFetchStatus,
            charactersFetchStatus
          ].some(stat => stat === "loading")}
        />
    );
}
