import React from "react";
import cn from "classnames";
import styles from "./CardBasicInfo.module.css";

interface Props {
    name: string
    type: string
    species?: string
    inlay?: boolean
}

export function CardBasicInfo(props: Props) {
    const { name, type, species, inlay } = props;

    const basicInfoStyles = cn({
        [styles["basic-info"]]: true,
        [styles.inlay]: inlay
    })

    return (
        <div className={basicInfoStyles}>
            <h2 className={styles["basic-info-name"]}>{name}</h2>
            <div className={styles["basic-info-type"]}>
                <p className={styles["basic-info-type-label"]}>type:</p>
                <p className={styles["basic-info-type-name"]}>{species || type}</p>
            </div>
        </div>
    );
}
