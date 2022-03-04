import React from "react";

import styles from "./SearchButton.module.css";

interface Props {
    isLoading?: boolean
    onClick(e: any): void
}

export function SearchButton(props: Props) {
    const { isLoading, onClick } = props;
    console.log({ isLoading })

    return (
        <button onClick={onClick} className={styles["search-button"]}>
            {isLoading
                ? (
                    <span className={styles["button-loading"]} />
                ) : (
                    "🔍"
                )
            }
        </button>
    );
}
