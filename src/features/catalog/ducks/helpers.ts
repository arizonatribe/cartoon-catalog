import { AnyObject, Location } from "./types";

export function getStatusEmoji(status: string = "") {
    return /^dead$/i.test(status)
        ? "💀"
        : /^unknown$/i.test(status)
            ? "❓"
            : "🧬";
}

export function filterLocations(
    text: string,
    locations: Location[]
): string[] {
    const filterPattern = new RegExp(`${
        text.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    }`, "i");

    return locations.filter((location: Location) => (
        filterPattern.test(location.name)
        || filterPattern.test(location.type)
        || filterPattern.test(location.dimension)
    )).map((location: Location) => location.name);
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
