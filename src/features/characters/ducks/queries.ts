const PagerSubFieldSelection = `
  count
  pages
`;

const LocationSubFieldSelection = `
  id
  name
  type
  dimension
`;

const EpisodeSubfieldSelection = `
  id
  name
  air_date
  episode
`;

const CharacterSubfieldSelecion = `
  id
  name
  type
  image
  status
  species
  created
`;

const FullCharacterSubfieldSelecion = `
  ${CharacterSubfieldSelecion}
  origin {
    ${LocationSubFieldSelection}
  }
  location {
    ${LocationSubFieldSelection}
  }
  episode {
    ${EpisodeSubfieldSelection}
  }
`;

export const getCharacter = `
  query getCharacter($id: ID!) {
    character(id: $id) {
      ${FullCharacterSubfieldSelecion}
    }
  }
`;

export const getPageOfCharacters = `
  query getPageOfCharacters($page: Int) {
    characters(page: $page) {
      info {
        ${PagerSubFieldSelection}
      }
      results {
        ${FullCharacterSubfieldSelecion}
      }
    }
  }
`;

export const searchCharacters = `
  query getPageOfCharacters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        ${PagerSubFieldSelection}
      }
      results {
        ${FullCharacterSubfieldSelecion}
      }
    }
  }
`;

export const searchLocations = `
  query getPageOfCharacters($page: Int, $filter: FilterLocation) {
    locations(page: $page, filter: $filter) {
      info {
        ${PagerSubFieldSelection}
      }
      results {
        ${LocationSubFieldSelection}
        residents {
          ${CharacterSubfieldSelecion}
        }
      }
    }
  }
`;

export const searchEpisodes = `
  query getPageOfCharacters($page: Int, $filter: FilterEpisode) {
    episodes(page: $page, filter: $filter) {
      info {
        ${PagerSubFieldSelection}
      }
      results {
        ${EpisodeSubfieldSelection}
      }
    }
  }
`;

export const getLocations = `
  query getLocations($page: Int) {
    locations(page: $page) {
      info {
        ${PagerSubFieldSelection}
      }
      results {
        ${LocationSubFieldSelection}
      }
    }
  }
`;
