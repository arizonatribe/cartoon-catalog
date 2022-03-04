import React, { useEffect, useState } from "react";

import { FetchStatus, SearchType, LocationsSlice, SearchSlice, Character, Location, CharactersSlice } from "./ducks";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { SearchWithAutoComplete } from "./SearchWithAutoComplete";

export function SearchWithAutoCompleteContainer() {
    const dispatch = useAppDispatch();
    const [searchType, setSearchType] = useState<SearchType>("🌍");

    const locations = useAppSelector<Location[]>(LocationsSlice.selectAllLocations);
    const characters = useAppSelector<Character[]>(CharactersSlice.selectCharactersList);
    const searchText = useAppSelector<string>(SearchSlice.selectSearchText);

    const locationsFetchStatus = useAppSelector<FetchStatus>(LocationsSlice.selectLocationsFetchStatus);
    const searchFetchStatus = useAppSelector<FetchStatus>(SearchSlice.selectSearchFetchStatus);
    const charactersFetchStatus = useAppSelector<FetchStatus>(CharactersSlice.selectCharacterFetchStatus);

    const handleSearch = (name?: string, type?: string) => {
        const filter = {
            ...(name && { name }),
            ...(type && { type })
        };

        if (searchType === "🌍") {
            dispatch(SearchSlice.searchCharactersByLocation(filter));
        } else {
            dispatch(SearchSlice.searchCharacters(filter));
        }
    };

    useEffect(() => {
        dispatch(LocationsSlice.getAllLocations());
    }, [dispatch]);

    return (
        <SearchWithAutoComplete
          text={searchText}
          searchType={searchType}
          toggleSearchType={() => setSearchType(searchType !== "🌍" ? "🌍": "👤")}
          handleSearch={handleSearch}
          suggestions={searchType === "🌍" ? locations : characters}
          isLoading={[
            locationsFetchStatus,
            searchFetchStatus,
            charactersFetchStatus
          ].some(stat => stat === "loading")}
        />
    );
}
