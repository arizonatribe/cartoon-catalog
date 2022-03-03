import React, { useEffect } from "react";

import { LocationsSlice, SearchSlice, Location } from "./ducks";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { SearchLocations } from "./SearchLocations";

export function SearchLocationsContainer() {
    const dispatch = useAppDispatch();
    const locations = useAppSelector<Location[]>(LocationsSlice.selectAllLocations);
    const searchText = useAppSelector<string>(SearchSlice.selectSearchText);
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
        <SearchLocations
          text={searchText}
          handleSearch={handleSearch}
          locations={locations}
        />
    );
}
