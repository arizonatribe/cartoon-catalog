import React from "react";

import { Pager } from "./Pager";
import { Catalog } from "./Catalog";
import { CardDetailContainer }  from "./CardDetail.container";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectCharacters, viewCharacter, Character } from "./ducks";

export function CatalogContainer() {
    const dispatch = useAppDispatch();
    const items = useAppSelector<Character[]>(selectCharacters);

    return (
        <>
            <Catalog
              items={items}
              viewDetail={(id: string) => dispatch(viewCharacter(id))}
            />
            <Pager />
            <CardDetailContainer />
        </>
    );
}
