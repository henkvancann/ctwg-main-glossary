# How to split a Markdown file into multiple files

## One time build

First, integrate the new functionality. This is a one time action:

```
gulp compile
```

## Repetitive tasks

Split `terms_and_definitions.md` into multiple files, one per term:

```
npm run split
```

Create the final html file:

```
npm run render
```
