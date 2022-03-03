import React from "react";
import cn from "classnames";
import { Character, getStatusEmoji } from "./ducks";
import styles from "./CardStatus.module.css";

interface Props extends Pick<Character, "status"> {
    hasTooltip?: boolean
    hasIcon?: boolean
}

export function CardStatus(props: Props) {
    const { status, hasTooltip, hasIcon } = props;

    const statusStyles = cn({
        [styles["card-status"]]: true,
        [styles["card-status-with-label"]]: !hasIcon,
        [styles["card-status-with-icon"]]: hasIcon,
        [styles["card-status-with-tooltip"]]: hasTooltip
    });
    const statusTextStyles = cn({
        [styles["status-tooltip"]]: hasTooltip,
        [styles["status-text"]]: true
    });

    return (
        <div className={statusStyles}>
            {hasIcon ? (
                <span className={styles["status-icon"]}>
                    {getStatusEmoji(status)}
                </span>
            ) : (
                <p className={styles["status-label"]}>status:</p>
            )}
            <span className={statusTextStyles}>
                {status}
            </span>
        </div>
    );
}
