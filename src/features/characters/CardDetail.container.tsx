import React from "react";

import { CardDetail } from "./CardDetail";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectCharacterDetail, closeDetail, Character } from "./ducks";
import styles from "./CardDetail.module.css";

export function CardDetailContainer() {
    const dispatch = useAppDispatch();
    const character = useAppSelector<Character|undefined>(selectCharacterDetail);

    return (
        character ? (
            <div className={styles["detail-wrapper"]}>
                <div onClick={() => dispatch(closeDetail())} className={styles["detail-backdrop"]} />

                <CardDetail character={character} />
            </div>
        ) : null
    );
}
