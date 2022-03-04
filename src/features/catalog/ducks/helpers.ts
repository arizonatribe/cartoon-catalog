import { AnyObject, Location, Character, Item } from "./types";

export function getStatusEmoji(status: string = "") {
    return /^dead$/i.test(status)
        ? "💀"
        : /^unknown$/i.test(status)
            ? "❓"
            : "🧬";
}

export function filterResults(
    text: string,
    results: Item[]
): string[] {
    const filterPattern = new RegExp(`${
        (text ?? "").toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    }`, "i");

    return results.filter((result: Item) => (
        filterPattern.test(result.name)
        || filterPattern.test(result.type)
        || filterPattern.test((result as Location)?.dimension)
        || filterPattern.test((result as Character)?.status)
        || filterPattern.test((result as Character)?.species)
    )).map((result: Item) => result.name);
}

export function createFullUrl(
    baseUrl: string,
    endpoint?: string,
    params: AnyObject = {}
): string {
    const urlWithEndpoint = [
        baseUrl.replace(/\/$/, ""),
        endpoint?.replace(/^\/|\/$/g, "")
    ].join("/");

    if (params && Object.keys(params).length) {
        const qs = new URLSearchParams(params)
        return new URL([urlWithEndpoint, qs].join("?")).toString();
    }

    return new URL(urlWithEndpoint).toString();
}
