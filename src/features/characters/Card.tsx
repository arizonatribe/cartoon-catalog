import React from "react";
import { Character } from "./ducks";
import { CardStatus } from "./CardStatus";
import { CardBasicInfo } from "./CardBasicInfo";
import styles from "./Card.module.css";

interface Props {
    data: Character
    viewDetail(): void
}

export function Card(props: Props) {
    const {
        viewDetail,
        data: { image, name, species, type, status }
    } = props;

    return (
        <div className={styles["card"]}>
            <img
              onClick={viewDetail}
              className={styles["card-image"]}
              src={image}
              alt={name}
            />
            <CardBasicInfo
              inlay
              name={name}
              type={type || species}
            />
            <CardStatus
              hasTooltip
              hasIcon
              status={status}
            />
        </div>
    );
}
