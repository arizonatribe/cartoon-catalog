import React, { useRef, useEffect, useCallback } from "react";

import { useAppDispatch } from "../../app/hooks";
import { SearchSlice } from "./ducks";
import styles from "./Pager.module.css";

export function Pager() {
    const ref = useRef(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(SearchSlice.nextPageOfCharacters());
    }, [dispatch]);

    /*
     * Using the native IntersectionObserver API,
     * we can determine if we're at the bottom of the page,
     * and then fetch the next page of characters for the catalog
     */
    const observer = useCallback(
        container => {
            new IntersectionObserver(characterSet => {
                characterSet
                    .filter(charSet => charSet.intersectionRatio)
                    .forEach(() => dispatch(SearchSlice.nextPageOfCharacters()));
            }).observe(container);
        }, [dispatch]
    );

    useEffect(() => {
        if (ref.current) {
            observer(ref.current);
        }
    }, [observer, ref]);

    return <div className={styles.pager} ref={ref} />;
}
