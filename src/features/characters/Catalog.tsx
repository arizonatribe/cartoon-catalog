import React from "react";
import { Character } from "./Character";
import { Character as CharacterType } from "./ducks";
import styles from "./Catalog.module.css";

interface Props {
    characters: CharacterType[]
}

export function Catalog(props: Props) {
    const { characters } = props;

    return (
        <div className={styles.catalog}>
            {characters.map((character) => (
                <Character key={character.id} character={character} />
            ))}
        </div>
    );
}
