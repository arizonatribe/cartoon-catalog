import React from "react";
import cn from "classnames";

import styles from "./AutoCompleteList.module.css";

interface Props {
    items: string[]
    selectedIndex?: number
    onClick?(e: any): void
    onBlur?(e: any): void
    onFocus?(e: any): void
    onMouseEnter?(e: any): void
    onMouseLeave?(e: any): void
}

export function AutoCompleteList(props: Props) {
    const {
        items,
        onBlur,
        onFocus,
        onClick,
        onMouseEnter,
        onMouseLeave,
        selectedIndex,
    } = props;

    return (
      <ul
          className={styles["autocomplete-items"]}
          { ...{
              ...(onBlur && { onBlur }),
              ...(onFocus && { onFocus }),
              ...(onClick && { onClick }),
              ...(onMouseEnter && { onMouseEnter }),
              ...(onMouseLeave && { onMouseLeave }),
          }}
      >
          {items.map((item, i) => (
              <li
                key={`${i}-${item}`}
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
