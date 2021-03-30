# Autocomplete

> Proof of concept Vue.js application. Implementation of dynamic list that can be filtered and ordered alphabetically. 

## Table of contents
* [Description](#description)
* [Screenshot](#screenshot)
* [Requirements](#requirements)
* [Project structure](#project-structure)
* [Development server](#development-server)


## Description

This is Vue.js application that dynamically fetches stores from a file, render them all, and generate a dynamic list of unigqye cities. By default, the cities are sorted alphabetically ascending, but sorting can be changed to descending also. Stores can be filtered based on city name or address name. Also autocompletion is implemented on the fliter input field that shows wether the autocompletion is achived by a city name or an address name. Records found by city names have a green background and by store names - a red background.

## Screenshot

![image](https://user-images.githubusercontent.com/16215654/112766901-28039080-9014-11eb-971b-15ff0ad9a54a.png)


## Requirements

This project was generated with:
- [Vue CLI](https://cli.vuejs.org/) version 4.5.12.
- [Node.js](https://nodejs.org/download/release/latest-v14.x/) version 14.16.0
  - To confirm version run `node -v` in a terminal window.
- [npm package manager](https://www.npmjs.com/package/npm/v/7.6.3) version 7.6.3
  - To confirm version run `npm -v` in a terminal window.

## Project structure

This project consists of frontend applicaton.
Notable folders:
- components/Stores - Stores component dynamically fetches data and renders them.
- components/SearchAutocomplete - Custom autocomplete implementation.
- public/stores.json - Holds stores data.
- app.vue - Calls stores component.

## Development server
Run `npm run serve` for a dev server. Navigate to http://localhost:6058/. The app will automatically reload if you change any of the source files.

