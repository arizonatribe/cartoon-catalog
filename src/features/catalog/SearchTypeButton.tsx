import React from "react";
import cn from "classnames";

import styles from "./SearchButton.module.css";

interface Props {
    children: React.ReactNode
    onClick(e: any): void
}

export function SearchTypeButton(props: Props) {
    const { children, onClick } = props;

    const buttonsStyles = cn({
        [styles["search-box-button"]]: true,
        [styles["search-type-button"]]: true
    });

    return (
        <button onClick={onClick} className={buttonsStyles}>
            {children}
        </button>
    );
}
