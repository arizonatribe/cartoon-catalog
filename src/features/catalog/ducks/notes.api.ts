import { Note } from "./types";
import { createFullUrl } from "./helpers";

const config = {
    url: process.env.REACT_APP_JSON_PLACEHOLDER_API ?? "",
    baseHeaders: {
        "Content-type": "application/json; charset=UTF-8",
        "Accept": "application/json"
    }
}

export async function createNote(note: Note): Promise<Note> {
    const { text, characterId } = note;

    if (!characterId) {
        throw new Error("Missing the character ID for the new note")
    }

    const url = createFullUrl(config.url, `posts/${characterId}`);

    const response = await fetch(url, {
        method: "post",
        headers: config.baseHeaders,
        body: JSON.stringify({ characterId, text })
    });
    const result = await response.json();

    return result as Note;
}

export async function updateNote(note: Note): Promise<Note> {
    const { text, characterId } = note;

    if (!characterId) {
        throw new Error("Missing the character ID for the note")
    }

    const url = createFullUrl(config.url, `posts/${characterId}`);

    const response = await fetch(url, {
        method: "put",
        headers: config.baseHeaders,
        body: JSON.stringify({ characterId, text })
    });
    const result = await response.json();

    return result as Note;
}

export async function fetchNote(characterId: string): Promise<Note> {
    if (!characterId) {
        throw new Error("Missing the character ID for the note lookup")
    }

    const url = createFullUrl(config.url, `posts/${characterId ?? ""}`);

    const response = await fetch(url);
    const result = await response.json();

    return result as Note;
}
