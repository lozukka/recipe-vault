# Recipe Vault

Currently working on this!

A personal recipe manager that pulls your saved recipes from anywhere into one searchable, tagged collection. With weekly meal planning built with.

## Features:

- Save - paste URL or type in recipe manually: title, ingredients, source link, modified versions ingredients, how many meals one recipe contains.
- Tag & filter - add tags like #pasta, filter by tags, search by name or ingredient.
- Plan - a simple weekly meal planner. Drag recipe into a day, generate a combined grocery list from week’s meals.
- Find - works across titles, ingredients and tags (this solves the cone pain)

## Roadmap:

- v1: manual saves, tag, edit and delete recipes
  Done when: I have added recipes, I can search, edit, delete them and the logic works
- v1.1.: weekly planner with Add-button, list lastCookedAt
  Done when: I can filter with lastCookedAt, I have made one weekly plan with the app
- v1.2: grocery list
  Done when: I can generate a grocery list with the app after planning the weekly menu

- v2: drag and drop weekly planner, real backend

- In the future: URL import, empty states

## Decisions:

- using localstorage + JSON export/import, wrap storage in a small module or custom hook so swapping later doesn’t touch components
- ingredient data model:
  recipe: {id, title, sourceURL, mealsQty, ingredients: [], modifiedIngredients: [], tags: [], createdAt, lastCookedAt}
- ingredients: {quantity: 2, unit: “dl”, name: “kerma”} - quantity and unit optional
- modifiedIngredients: { quantity, unit, name, note } - quantity, unit and note optional
- unit list: l, dl, rkl, tl, g, kg, kpl
- id: crypto.randomUUID() - or something like that
- quantities must accept comma on input
- lastCookedAt (a date, I can filter recipes that I haven’t cooked in a while)

```
recipe: {
    id,
    title,
    sourceURL,
    mealsQty,
    ingredients: [{quantity(optional), unit(optional), name}],
    modifiedIngredients: [{quantity(optional), unit(optional), name, note(optional)}],
    tags: [],
    createdAt,
    lastCookedAt
}
```
