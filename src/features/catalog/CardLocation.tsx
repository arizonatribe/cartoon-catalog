import React from "react";

import { Location } from "./ducks";
import styles from "./CardLocation.module.css";

interface Props {
    location: Location
}

export function CardLocation(props: Props) {
    const { location: { name, type } } = props;

    return (
        <div className={styles["location-wrapper"]}>
            <p className={styles["location-label"]}>location:</p>
            <p className={styles["location-name"]}>{name}</p>
            {type && <p className={styles["location-type"]}>{type}</p>}
        </div>
    );
}
