import React, { useState } from "react";

import { Location, filterLocations } from "./ducks";
import { AutoCompleteList } from "./AutoCompleteList";
import styles from "./SearchLocations.module.css";

interface Props {
    text: string
    locations: Location[]
    handleSearch(search: string): void
}

enum KeyCodes {
    up = 40,
    down = 38,
    enter = 13,
    escape = 27,
    backspace = 8
}

export function SearchLocations(props: Props) {
    const { locations, text, handleSearch } = props;
    const [autocompleteItems, setAutocompleteItems] = useState<string[]>([]);
    const [highlightedItemIndex, setHighlightedItemIndex] = useState<number>(0);

    function handleSelect(textVal: string, listedItems: string[] = []) {
        setAutocompleteItems(listedItems);
        setHighlightedItemIndex(0);
        handleSearch(textVal);
    }

    function handleChange(e: any) {
        const textVal = e.target.value;
        const listedItems = filterLocations(textVal, locations);

        handleSelect(textVal, listedItems);
    }

    function handleKeyDown(e: any) {
        if (e.keyCode === KeyCodes.escape) {
            setAutocompleteItems([]);
        } else if (e.keyCode === KeyCodes.enter) {
            handleSelect(autocompleteItems[highlightedItemIndex] || e.target.value);
        } else if (e.keyCode === KeyCodes.down && highlightedItemIndex) {
            setHighlightedItemIndex(highlightedItemIndex - 1);
        } else if (e.keyCode === KeyCodes.up && highlightedItemIndex < autocompleteItems.length) {
            setHighlightedItemIndex(highlightedItemIndex + 1);
        }
    }

    return (
        <div className={styles["search-locations-wrapper"]}>
            <div className={styles["search-with-button"]}>
                <input
                  type="text"
                  value={text}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  className={styles["search-locations-textbox"]}
                />
                <button
                  onClick={() => handleSelect(text)}
                  className={styles["search-button"]}
                >
                 🔍
                </button>
            </div>
            {text.trim() && autocompleteItems.length > 0 && (
                <AutoCompleteList
                  onClick={handleSelect}
                  items={autocompleteItems}
                  selectedIndex={highlightedItemIndex}
                />
            )}
        </div>
    );
}
