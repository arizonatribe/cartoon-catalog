import React from "react";
import { Card } from "./Card";
import { Character } from "./ducks";
import styles from "./Catalog.module.css";

interface Props {
    items: Character[]
    viewDetail(id: string): void
}

export function Catalog(props: Props) {
    const { items, viewDetail } = props;

    return (
        <div className={styles.catalog}>
            {items.map((item) => (
                <Card
                  key={item.id}
                  data={item}
                  viewDetail={() => viewDetail(item.id)}
                />
            ))}
        </div>
    );
}
