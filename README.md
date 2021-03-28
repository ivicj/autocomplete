# Autocomplete

> Proof of concept Vue.js application. Implementation of dynamic list that can be filtered and ordered alphabetically. 

## Table of contents
* [Description](#description)
* [Screenshot](#screenshot)
* [Requirements](#requirements)
* [Project structure](#project-structure)


## Description

This is Vue.js application that dynamically fetches stores from a file, render them all, and generate a dynamic list of unigqye cities. By default, the cities are sorted alphabetically ascending, but sorting can be changed to descending also. Stores can be filtered based on city name or address name. Also autocompletion is implemented on the fliter input field that shows wether the autocompletion is achived by a city name or an address name. Records found by city names have a green background and by store names - a red background.

## Screenshot



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
- components/Stores - Stores component
- components/SearchAutocomplete - autocomplete
- public/stores.json - Holds post model.
- app.vue - Fetches data and renders them.
