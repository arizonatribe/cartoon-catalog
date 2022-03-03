import React from "react";

import { Pager } from "./Pager";
import { Catalog } from "./Catalog";
import { CardDetailContainer }  from "./CardDetail.container";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { SearchSlice, DetailSlice, Character } from "./ducks";

export function CatalogContainer() {
    const dispatch = useAppDispatch();
    const items = useAppSelector<Character[]>(SearchSlice.selectSearchMatches);

    // useEffect(() => {
    //     dispatch(CharactersSlice.cacheAllCharacterIds());
    // }, [dispatch]);

    return (
        <>
            <Catalog
              items={items}
              viewDetail={(id: string) => dispatch(DetailSlice.viewCharacter(id))}
            />
            <Pager />
            <CardDetailContainer />
        </>
    );
}
