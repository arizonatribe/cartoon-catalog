import React from "react";
import { Character as CharacterType } from "./ducks";
import styles from "./Character.module.css";

function getStatusEmoji(status: string = "") {
    return /^dead$/i.test(status)
        ? "💀"
        : /^unknown$/i.test(status)
            ? "❓"
            : "🧬";
}

interface Props {
    character: CharacterType
}

export function Character(props: Props) {
    const { character } = props;

    return (
        <div className={styles["card"]}>
            <img className={styles["card-image"]} src={character.image} alt={character.name} />
            <div className={styles["card-details"]}>
                <h2 className={styles["card-details-name"]}>{character.name}</h2>
                <div className={styles["card-details-species"]}>
                    <p className={styles["card-details-species-label"]}>species:</p>
                    <p className={styles["card-details-species-name"]}>{character.species}</p>
                </div>
                <p className={styles["card-details-type"]}>{character.type}</p>
            </div>
            <div className={styles["card-details-status"]}>
                <span className={styles["card-details-status-icon"]}>
                    {getStatusEmoji(character.status)}
                </span>
                <span className={styles["card-details-status-tooltip"]}>
                    {character.status}
                </span>
            </div>
        </div>
    );
}
