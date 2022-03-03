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
    getLocations,
    getCharacter,
    getAllCharacterIds,
    getCharactersCount,
    getCharactersByIds,
    getPageOfCharacters
} from "./queries";

const config = {
    url: process.env.REACT_APP_RICK_AND_MORTY_API ?? "",
    baseHeaders: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
}

function mapIds(results: [{ id: string, residents: [{ id: string }] }]): string[] {
    if (results.some(r => r.residents != null)) {
        const ids: string[] = [];

        results.forEach(res => {
            ids.push(...res.residents.map(r => r.id));
        });

        return ids;
    }

    return results.map(c => c.id);
}

async function fetchAllPagedIds(
    fetchFn: (page?: number) => Promise<{
        info: { pages: number },
        results: [{ id: string, residents: [{ id: string }] }]
    }>,
    page?: number
): Promise<string[]> {
    const firstPageOfResults = await fetchFn(page ?? 1);

    const characterIds: string[] = [];

    if (firstPageOfResults?.info?.pages) {
        const { info: { pages }, results: res } = firstPageOfResults;

        characterIds.push(...mapIds(res));

        if (page == null) {
            for (const p of Array(pages - 1).fill(2).map((v, i) => v + i)) {
                const { results } = await fetchFn(p)
                characterIds.push(...mapIds(results));
            }
        }
    }

    return characterIds;
}

export async function fetchCharactersCount(): Promise<number> {
    const response = await fetch(config.url, {
        method: "post",
        headers: config.baseHeaders,
        body: JSON.stringify({ query: getCharactersCount })
    });
    const result = await response.json();

    return result.data?.characters?.info?.count ?? 0;
}

export async function fetchAllCharacterIds(): Promise<string[]> {
    async function fetchCharacterIds(page: number = 1) {
        const response = await fetch(config.url, {
            method: "post",
            headers: config.baseHeaders,
            body: JSON.stringify({
                query: getAllCharacterIds,
                variables: { page }
            })
        });
        const result = await response.json();

        return result.data?.characters ?? {};
    }

    return fetchAllPagedIds(fetchCharacterIds);
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

export async function fetchCharactersByIds(
    ids: string[]
): Promise<Character[]> {
    const response = await fetch(config.url, {
        method: "post",
        headers: config.baseHeaders,
        body: JSON.stringify({
            query: getCharactersByIds,
            variables: { ids }
        })
    });
    const result = await response.json();

    return (result.data?.charactersByIds ?? []) as Character[];
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
    page?: number
): Promise<string[]> {
    async function fetchCharacterIds(p: number = 1) {
        const response = await fetch(config.url, {
            method: "post",
            headers: config.baseHeaders,
            body: JSON.stringify({
                query: searchLocations,
                variables: { filter, page: p }
            })
        });

        const result = await response.json();

        return result.data?.locations ?? {};
    }

    return fetchAllPagedIds(fetchCharacterIds, page);
}

export async function fetchCharactersByFilter(
    filter: FilterCharacter,
    page?: number
): Promise<string[]> {
    async function fetchCharacterIds(p: number = 1) {
        const response = await fetch(config.url, {
            method: "post",
            headers: config.baseHeaders,
            body: JSON.stringify({
                query: searchCharacters,
                variables: { filter, page: p }
            })
        });

        const result = await response.json();

        return result.data?.characters ?? {};
    }

    return fetchAllPagedIds(fetchCharacterIds, page);
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
