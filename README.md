## Cartoon Catalog

A React/Redux based application which demonstrates a styled card layout with search filtering.

[Demo](https://arizonatribe.github.io/cartoon-catalog/)

## Dependencies

* [Node](https://nodejs.org/en/)
* [Yarn](https://yarnpkg.com) - Install via `npm install -g yarn` after Node has been installed

## Getting Started

Clone this repository and install the local dependencies:

```
yarn install
```

Once they've been installed into the `node_modules` directory, you can run the application:

```
yarn start
```

Navigate to https://localhost:3000 and interact with the application.

## Usage

Filter cartoon characters using the search box. Once you begin typing, you'll see a list of fictional-ish locations where some of these characters reside.

Any one character will be visible in a card on the main page and you can click their picture to view additional details (or to add any notes).

Note: you can search by location or search by character name by toggling the search type button from 🌍 to 👤

## Mock Environment

This exercise makes use of the following two API URLs which are free to use (but not abuse):
* [Rick and Morty API](https://rickandmortyapi.com/graphql)
* [Json Placeholder API](https://jsonplaceholder.typicode.com)

The base URLs are set in the [`.env`](.env) file included in this project:

```
REACT_APP_RICK_AND_MORTY_API=https://rickandmortyapi.com/graphql
REACT_APP_JSON_PLACEHOLDER_API=https://jsonplaceholder.typicode.com
```
