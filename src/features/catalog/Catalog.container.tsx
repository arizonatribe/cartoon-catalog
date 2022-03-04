import React from "react";

import { Pager } from "./Pager";
import { Catalog } from "./Catalog";
import { CardDetailContainer }  from "./CardDetail.container";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { FetchStatus, SearchSlice, DetailSlice, LocationsSlice, CharactersSlice, Character } from "./ducks";

export function CatalogContainer() {
    const dispatch = useAppDispatch();
    const items = useAppSelector<Character[]>(SearchSlice.selectSearchMatches);
    const locationsFetchStatus = useAppSelector<FetchStatus>(LocationsSlice.selectLocationsFetchStatus);
    const searchFetchStatus = useAppSelector<FetchStatus>(SearchSlice.selectSearchFetchStatus);
    const charactersFetchStatus = useAppSelector<FetchStatus>(CharactersSlice.selectCharacterFetchStatus);

    // useEffect(() => {
    //     dispatch(CharactersSlice.cacheAllCharacterIds());
    // }, [dispatch]);

    return (
        <>
            <Catalog
              items={items}
              viewDetail={(id: string) => dispatch(DetailSlice.viewCharacter(id))}
              isLoading={[
                locationsFetchStatus,
                searchFetchStatus,
                charactersFetchStatus
              ].some(stat => stat === "loading")}
            />
            <Pager />
            <CardDetailContainer />
        </>
    );
}
