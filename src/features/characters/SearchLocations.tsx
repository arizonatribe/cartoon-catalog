import React, { useState } from "react";

import { Location } from "./ducks";
import { AutoCompleteList } from "./AutoCompleteList";
import styles from "./SearchLocations.module.css";

interface Props {
    locations: Location[]
    handleSearch(search: string): void
}

export function SearchLocations(props: Props) {
    const { locations, handleSearch } = props;
    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [input, setInput] = useState("");
  
    const onChange = (e: any) => {
        const userInput = e.target.value;
        const searchPattern = new RegExp(`${userInput.toLowerCase()}`, "i");
    
        // Filter our suggestions that don't contain the user's input
        const unLinked = locations.filter((location: Location) => (
            searchPattern.test(location.name)
            || searchPattern.test(location.type)
            || searchPattern.test(location.dimension)
        )).map((location: Location) => location.name);
    
        setInput(userInput);
        handleSearch(userInput);
        console.log({ unLinked, locations })
        setFilteredSuggestions(unLinked);
        setActiveSuggestionIndex(0);
        setShowSuggestions(true);
    };

    const onClick = (text: string) => {
        setFilteredSuggestions([]);
        setInput(text);
        handleSearch(text);
        setActiveSuggestionIndex(0);
        setShowSuggestions(false);
    };
  
    const onKeyDown = (e: any) => {
        console.log(e.keyCode, activeSuggestionIndex)
        // User pressed the enter key
        if (e.keyCode === 13) {
          setInput(filteredSuggestions[activeSuggestionIndex]);
          handleSearch(filteredSuggestions[activeSuggestionIndex]);
          setActiveSuggestionIndex(0);
          setShowSuggestions(false);
        }
        // User pressed the up arrow
        else if (e.keyCode === 38) {
          if (activeSuggestionIndex === 0) {
            return;
          }
    
          setActiveSuggestionIndex(activeSuggestionIndex - 1);
        }
        // User pressed the down arrow
        else if (e.keyCode === 40) {
          if (activeSuggestionIndex - 1 === filteredSuggestions.length) {
            return;
          }
    
          setActiveSuggestionIndex(activeSuggestionIndex + 1);
        }
    };
  
    return (
        <div className={styles["search-locations-wrapper"]}>
            <input
              type="text"
              value={input}
              onChange={onChange}
              onKeyDown={onKeyDown}
              className={styles["search-locations-textbox"]}
            />
            {showSuggestions && input && filteredSuggestions.length && (
                <AutoCompleteList
                  onClick={onClick}
                  items={filteredSuggestions}
                  selectedIndex={activeSuggestionIndex}
                />
            )}
        </div>
    );
}
