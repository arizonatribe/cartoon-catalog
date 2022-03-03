import React, { useState, useEffect } from "react";

import styles from "./NoteDetail.module.css";

interface Props {
    text: string
    handleSave(text: string): void
}

export function NoteDetail(props: Props) {
    const { handleSave, text } = props;
    const [note, setNote] = useState<string>("");

    useEffect(() => {
        setNote(text);
    }, [text]);

    function handleChange(e: any) {
        const val = e.target.value;
        setNote(val);
    }
    function handleBlur(e: any) {
        const val = e.target.value;
        handleSave(val);
    }

    return (
        <div className={styles["note-detail"]}>
            <form onSubmit={() => handleSave(note)}>
                <label>Notes:</label>
                <textarea
                    name="note"
                    value={note}
                    onKeyDown={handleChange}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={styles["note-textarea"]}
                />
            </form>
        </div>
    );
}
