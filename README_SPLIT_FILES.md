# How to split `terms_and_definitions.md` file into multiple files

## General info

The JSON file `specs.unsplit.json` is a one time back-up of `specs.json`.

## How to split terms_and_definitions.md

Split `terms_and_definitions.md` into multiple files, one file per term:

```
npm run split
```

Create the glossary file (named `index.html`):

```
npm run render
```
