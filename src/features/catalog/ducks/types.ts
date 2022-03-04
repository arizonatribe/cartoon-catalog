export type FetchStatus = "loading" | "idle" | "failed";

export enum KeyCodes {
    up = 38,
    down = 40,
    enter = 13,
    escape = 27,
    backspace = 8
}

export interface AnyObject {
    [key: string]: any | AnyObject
}

export interface Pager {
    count: number
    pages: number
}

export type FilterLocation = {
  type?: string
  name?: string
  dimension?: string
}

export type FilterCharacter = {
    type?: string
    name?: string
    status?: string
    gender?: string
    species?: string
}

export type FilterEpisode = {
    name?: string
    episode?: string
}

export interface Item extends AnyObject {
  name: string
  type: string
}

export interface Location extends Item {
  id: string
  dimension: string
  residents: Character[]
  created: string
}

export type Episode = {
  id: string
  name: string
  air_date: string
  episode: string
  characters: Character[]
  created: string
}

export interface Character extends Item {
  id: string
  status: 'Unknown' | 'Alive' | 'Dead'
  species: string
  gender: string
  origin: Location
  location: Location
  image: string
  episode: Episode[]
  created: string
}

export interface CharacterFormatted extends Character {
    statusIcon: "💀" | "❓" | "🧬"
}

export interface Note {
    characterId: string
    text: string
}
