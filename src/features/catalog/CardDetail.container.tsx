import React from "react";

import { CardDetail } from "./CardDetail";
import { NoteDetail } from "./NoteDetail";
import { DetailSlice, NotesSlice, Character } from "./ducks";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import styles from "./CardDetail.module.css";

const { createCharacterNote } = NotesSlice;
const { selectCharacterDetail, closeDetail } = DetailSlice;

export function CardDetailContainer() {
    const dispatch = useAppDispatch();
    const character = useAppSelector<Character|undefined>(selectCharacterDetail);
    const existingNoteText = useAppSelector<string|undefined>(state => (
        NotesSlice.selectNoteDetail(state, character?.id as string)
    ));

    return (
        character ? (
            <div className={styles["detail-wrapper"]}>
                <div
                  onClick={() => dispatch(closeDetail())}
                  className={styles["detail-backdrop"]}
                />
                <CardDetail character={character}>
                    <NoteDetail
                      text={existingNoteText ?? ""}
                      handleSave={(text: string) => dispatch(createCharacterNote(text, character.id))}
                    />
                </CardDetail>
            </div>
        ) : null
    );
}
