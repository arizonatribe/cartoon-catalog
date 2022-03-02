import {
    FilterCharacter,
    FilterEpisode,
    FilterLocation,
    Location,
    Character,
    Episode,
    Pager
} from "./types";
import {
    searchEpisodes,
    searchLocations,
    searchCharacters,
    getCharacter,
    getLocations,
    getPageOfCharacters
} from "./queries";

const config = {
    url: process.env.REACT_APP_RICK_AND_MORTY_API ?? "",
    baseHeaders: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
}

export async function fetchCharactersByPage(
    page: number = 1
): Promise<Character[]> {
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

export async function fetchCharacterById(id: string): Promise<Character> {
    const response = await fetch(config.url, {
        method: "post",
        headers: config.baseHeaders,
        body: JSON.stringify({
            query: getCharacter,
            variables: { id }
        })
    });
    const result = await response.json();

    return result.data?.character as Character;
}

export async function fetchCharactersByFilter(
    filter: FilterCharacter,
    page: number = 1
): Promise<Character[]> {
    const response = await fetch(config.url, {
        method: "post",
        headers: config.baseHeaders,
        body: JSON.stringify({
            query: searchCharacters,
            variables: { filter, page }
        })
    });
    const result = await response.json();

    return (result.data?.characters?.results ?? []) as Character[];
}

export async function fetchEpisodesByFilter(
    filter: FilterEpisode,
    page: number = 1
): Promise<Episode[]> {
    const response = await fetch(config.url, {
        method: "post",
        headers: config.baseHeaders,
        body: JSON.stringify({
            query: searchEpisodes,
            variables: { filter, page }
        })
    });
    const result = await response.json();

    return (result.data?.episodes?.results ?? []) as Episode[];
}

export async function fetchLocationsByFilter(
    filter: FilterLocation,
    page: number = 1
): Promise<Location[]> {
    const response = await fetch(config.url, {
        method: "post",
        headers: config.baseHeaders,
        body: JSON.stringify({
            query: searchLocations,
            variables: { filter, page }
        })
    });
    const result = await response.json();

    return (result.data?.locations?.results ?? []) as Location[];
}

export async function fetchAllLocations(): Promise<Location[]> {
    async function fetchPageOfLocations(page: number = 1) {
        const response = await fetch(config.url, {
            method: "post",
            headers: config.baseHeaders,
            body: JSON.stringify({
                query: getLocations,
                variables: { page }
            })
        });
        const result = await response.json();

        return result.data?.locations as { results: Location[], info: Pager };
    }

    const firstPageOfResults = await fetchPageOfLocations();

    if (firstPageOfResults) {
        const { info: { pages }, results: locations } = firstPageOfResults;

        for (const page of Array(pages - 1).fill(2).map((v, i) => v + i)) {
            const { results } = await fetchPageOfLocations(page)
            locations.push(...results);
        }

        return locations;
    }

    return [];
}
