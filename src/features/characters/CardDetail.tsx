import React from "react";

import { Character } from "./ducks";
import { CardStatus } from "./CardStatus";
import { CardEpisode } from "./CardEpisode";
import { CardLocation } from "./CardLocation";
import { CardBasicInfo } from "./CardBasicInfo";
import styles from "./CardDetail.module.css";

interface Props {
    character: Character
}

export function CardDetail(props: Props) {
    const { character: { name, type, status, location, episode, species, image } } = props;

    return (
        <div className={styles.detail}>
            <img className={styles["detail-image"]} src={image} alt={name} />
            <CardBasicInfo name={name} type={type || species} />
            <CardStatus status={status} />
            <CardLocation location={location} />
            <CardEpisode episodes={episode} />
        </div>
    );
}
