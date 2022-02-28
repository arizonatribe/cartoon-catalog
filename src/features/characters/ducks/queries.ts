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
