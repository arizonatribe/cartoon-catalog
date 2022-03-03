import React from "react";
import cn from "classnames";

import styles from "./AutoCompleteList.module.css";

interface Props {
    items: string[]
    selectedIndex?: number
    onClick(text: string): void
}

export function AutoCompleteList(props: Props) {
    const { items, selectedIndex, onClick } = props;

    return (
      <ul
          className={styles["autocomplete-items"]}
          onClick={(e: any) => onClick(e.target.innerText)}
      >
          {items.map((item, i) => (
              <li
                key={item}
                className={cn({
                    [styles["item-active"]]: true,
                    [styles["item-highlighted"]]: selectedIndex === i
                })}
              >
              {item}
            </li>
          ))}
      </ul>
    );
}
