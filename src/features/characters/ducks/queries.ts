export const getPageOfCharacters = `
  query getPageOfCharacters($page: Int) {
    characters(page: $page) {
      info {
        count
      }
      results {
        id
        name
        image
        status
        species
      }
    }
  }
`;

export const getCharacter = `
  query getCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      origin {
        id
        name
        type
        dimension
      }
      location {
        id
        name
        type
        dimension
      }
      image
      episode {
        id
        name
        air_date
        episode
      }
      created
    }
  }
`;
