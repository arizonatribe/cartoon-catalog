import React, { useState, useEffect } from "react";

import { SearchButton } from "./SearchButton";
import { SearchTypeButton } from "./SearchTypeButton";
import { AutoCompleteList } from "./AutoCompleteList";
import { KeyCodes, Item, filterResults } from "./ducks";
import styles from "./SearchWithAutoComplete.module.css";

interface Props {
    text: string
    searchType: string
    toggleSearchType(): void
    isLoading?: boolean
    suggestions: Item[]
    handleSearch(search: string): void
}

export function SearchWithAutoComplete(props: Props) {
    const { suggestions, searchType, toggleSearchType, isLoading, text, handleSearch } = props;

    const [autocompleteItems, setAutocompleteItems] = useState<string[]>([]);
    const [suggestionsFocused, setAutoCompleteFocused] = useState<boolean>(false);
    const [searchFocused, setSearchFocused] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<string>(text);
    const [highlightedItemIndex, setHighlightedItemIndex] = useState<number>(-1);
    const [inputText, setInputText] = useState<string>(text);
    const [shouldScrollToTop, setShouldScrollToTop] = useState<boolean>(false);

    useEffect(() => {
        if (shouldScrollToTop) {
            window.scrollTo(0, 0);
            setShouldScrollToTop(false);
        }
    }, [shouldScrollToTop]);

    useEffect(() => {
        if (searchFocused) {
            setAutocompleteItems(filterResults(inputText, suggestions));
        } else if (!suggestionsFocused) {
            setAutocompleteItems([]);
            setHighlightedItemIndex(-1);
        }

        if (!inputText) {
            setSelectedItem("");
        }
    }, [inputText, suggestions, searchFocused, suggestionsFocused]);

    function handleChange(e: any) {
        const textVal = e.target.value;
        setInputText(textVal);
    }

    function handleSubmit(textVal: string) {
        setInputText(textVal);
        setSelectedItem(textVal);
        setHighlightedItemIndex(-1);
        setAutocompleteItems([]);
        setShouldScrollToTop(true);

        if (textVal !== text) {
            handleSearch(textVal);
        }
    }

    function handleKeyDown(e: any) {
        const currentTextInput = e.target.value;
        const keycode = e.keyCode;

        switch (keycode) {
            case KeyCodes.escape: {
                handleSubmit("");
                break;
            }
            case KeyCodes.enter: {
                handleSubmit(autocompleteItems[highlightedItemIndex] || currentTextInput);
                break;
            }
            case KeyCodes.up: {
                setHighlightedItemIndex(Math.max(highlightedItemIndex - 1, 0));
                break;
            }
            case KeyCodes.down: {
                if (highlightedItemIndex === -1) {
                    setHighlightedItemIndex(0);
                    setSelectedItem("");
                    setAutocompleteItems(filterResults(inputText, suggestions));
                } else {
                    setHighlightedItemIndex(
                        Math.min(highlightedItemIndex + 1, autocompleteItems.length - 1)
                    );
                }
                break;
            }
            default: {
                setInputText(currentTextInput);
                break;
            }
        }
    }

    return (
        <div className={styles["search-wrapper"]}>
            <div className={styles["search-with-button"]}>
                <SearchTypeButton onClick={toggleSearchType}>
                    {searchType}
                </SearchTypeButton>
                <input
                  type="text"
                  value={inputText}
                  onBlur={() => setSearchFocused(false)}
                  onFocus={() => {
                      setInputText("");
                      setSelectedItem("");
                      setSearchFocused(true);
                  }}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  className={styles["search-textbox"]}
                />
                <SearchButton isLoading={isLoading} onClick={() => handleSubmit(inputText)} />
            </div>
            {!selectedItem && autocompleteItems.length > 0 && (
                <AutoCompleteList
                  items={autocompleteItems}
                  selectedIndex={highlightedItemIndex}
                  onFocus={() => setAutoCompleteFocused(true)}
                  onBlur={() => setAutoCompleteFocused(false)}
                  onClick={(e: any) => handleSubmit(e.target.innerText)}
                  onMouseEnter={() => setAutoCompleteFocused(true)}
                  onMouseLeave={() => setAutoCompleteFocused(false)}
                />
            )}
        </div>
    );
}
