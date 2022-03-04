import React from "react";
import cn from "classnames";

import styles from "./SearchButton.module.css";

interface Props {
    isLoading?: boolean
    onClick(e: any): void
}

export function SearchButton(props: Props) {
    const { isLoading, onClick } = props;

    const buttonsStyles = cn({
        [styles["search-box-button"]]: true,
        [styles["search-button"]]: true
    });

    return (
        <button onClick={onClick} className={buttonsStyles}>
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
