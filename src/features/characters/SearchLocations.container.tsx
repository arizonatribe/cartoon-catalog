import React, { useEffect } from "react";

import { getAllLocations, Location, searchCharactersByLocation, selectAllLocations } from "./ducks";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { SearchLocations } from "./SearchLocations";

export function SearchLocationsContainer() {
    const dispatch = useAppDispatch();
    const locations = useAppSelector<Location[]>(selectAllLocations);
    const handleSearch = (name?: string, type?: string) => {
        const filter = {
            ...(name && { name }),
            ...(type && { type })
        };
        dispatch(searchCharactersByLocation(filter));
    };

    useEffect(() => {
        dispatch(getAllLocations());
    }, [dispatch]);

    return <SearchLocations handleSearch={handleSearch} locations={locations} />;
}
