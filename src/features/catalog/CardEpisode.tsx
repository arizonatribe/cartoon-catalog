import React from "react";

import { Episode } from "./ducks";
import styles from "./CardEpisode.module.css";

interface Props {
    episodes: Episode[]
}

export function CardEpisode(props: Props) {
    const { episodes } = props;

    return (
        <div className={styles["episodes-wrapper"]}>
            <label>Episodes:</label>
            <div className={styles.episodes}>
                {episodes.map((epi: Episode) => (
                    <div key={epi.episode} className={styles["episode-wrapper"]}>
                        <p className={styles["episode-number"]}>{epi.episode}</p>
                        <p className={styles["episode-name"]}>{epi.name}</p>
                        {epi.air_date && (
                            <p className={styles["episode-air-date"]}>{epi.air_date}</p>
                        )}
                    </div>
                ))}
             </div>
        </div>
    );
}
