import React from "react";

import { Pager } from "./Pager";
import { Catalog } from "./Catalog";
import { useAppSelector } from "../../app/hooks";
import { selectCharacters, Character } from "./ducks";

export function CatalogContainer() {
    const characters = useAppSelector<Character[]>(selectCharacters);

    return (
        <>
            <Catalog characters={characters} />
            <Pager />
        </>
    );
}
