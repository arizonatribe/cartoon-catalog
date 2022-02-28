import { Character } from "./types";
import { getPageOfCharacters } from "./queries";

const config = {
    url: process.env.REACT_APP_RICK_AND_MORTY_API ?? "",
    baseHeaders: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
}

export async function fetchCharactersByPage(page: number): Promise<Character[]> {
    const response = await fetch(config.url, {
        method: "post",
        headers: config.baseHeaders,
        body: JSON.stringify({
            query: getPageOfCharacters,
            variables: { page }
        })
    });
    const result = await response.json();

    return (result.data?.characters?.results ?? []) as Character[];
}
