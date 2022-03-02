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

export type Location = {
  id: string
  name: string
  type: string
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

export interface Character {
  id: string
  name: string
  status: 'Unknown' | 'Alive' | 'Dead'
  species: string
  type: string
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
