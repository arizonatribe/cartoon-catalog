import React from "react";
import { Card } from "./Card";
import { Character } from "./ducks";
import styles from "./Catalog.module.css";

interface Props {
    items: Character[]
    isLoading?: boolean
    viewDetail(id: string): void
}

export function Catalog(props: Props) {
    const { items, isLoading, viewDetail } = props;

    return (
        <div className={styles.catalog}>
            {items.length === 0 && (
                <h1>{isLoading ? "loading results..." : "No results"}</h1>
            )}
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
