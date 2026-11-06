# Recipe Vault

Currently working on this!

A personal recipe manager that pulls your saved recipes from anywhere into one searchable, tagged collection. With weekly meal planning built with.

## Features:

- Save - paste URL or type in recipe manually: title, ingredients, source link, modified versions ingredients, how many meals one recipe contains.
- Tag & filter - add tags like #pasta, filter by tags, search by name or ingredient.
- Plan - a simple weekly meal planner. Drag recipe into a day, generate a combined grocery list from week’s meals.
- Find - works across titles, ingredients and tags (this solves the cone pain)

## Roadmap:

- v1: manual saves, tag, edit and delete recipes (one localStorage)
  Done when: I have added recipes, I can search, edit, delete them and the logic works
- v1.1.: weekly planner with Add-button, list lastCookedAt
  Done when: I can filter with lastCookedAt, I have made one weekly plan with the app
- v1.2: grocery list
  Done when: I can generate a grocery list with the app after planning the weekly menu

- v2: drag and drop weekly planner, real shareable backend

- In the future: URL import, empty states

## Decisions

### Storage

- **V1 uses `localStorage` in a single browser.** Recipes live on one device. V2 adds a backend so recipes can be shared between devices and users.
- **Storage is wrapped in a small module** (`loadRecipes` / `saveRecipes`), so swapping to a backend later doesn't touch the components.
- **Data is stored as `{ version, recipes }`.** The version number makes it possible to migrate the data format later.
- **Corrupted or unrecognized data is backed up, not deleted.** If the stored data can't be parsed or has the wrong shape or version, it is copied to a backup key before the main key is cleared, and the app starts with an empty list.
- **Storage failures never crash the app.** If `localStorage` is blocked or full, loading returns an empty list and saving returns `false`.
- **JSON export/import** (planned) so data is never trapped in one browser.

### Data model

- **Recipe:** `{ id, title, sourceURL, mealsQty, ingredients, modifiedIngredients, tags, createdAt, lastCookedAt }`
- **Ingredient:** `{ quantity, unit, name }`. Quantity and unit are optional, so "salt to taste" works. Quantity and unit are separate fields, so a grocery list can add amounts together later.
- **Modified ingredient:** `{ quantity, unit, name, note }`, where `note` is optional. These are optional additions or swaps ("add bacon", "feta instead of cheese") kept on the same recipe, so there is one makaroonilaatikko and not three nearly identical ones.
- **Missing optional values are `null`**, so every stored object has the same shape.
- **`mealsQty` defaults to `1`**, so the planner and grocery list never have to handle an unknown number of meals.
- **`lastCookedAt` is `null` until a recipe is cooked.** It makes it possible to find recipes I haven't cooked in a while.
- **Unit list:** `l`, `dl`, `rkl`, `tl`, `g`, `kg`, `kpl`, chosen from a dropdown with an empty option.
- **Tags** are stored in plain lowercase form, such as `"pasta"`, with the `#` added only when displayed. (Normalization is planned for the tag input.)

### Values and parsing

- **IDs:** `crypto.randomUUID()`.
- **Dates:** `createdAt` and `lastCookedAt` are ISO strings (`new Date().toISOString()`), because they survive JSON storage and sort correctly.
- **Quantities accept a decimal comma** (`0,5`), as is natural in Finnish. `parseQuantity` returns a number, `null` for empty input, or `undefined` for invalid input, including non-strings.
- **A quantity of `0` is valid**, for modified ingredients like "0 g bacon, note: remove this".
- **Clean data at the edges.** Form input is parsed and normalized before it enters the app, so the rest of the code can rely on its shape.

### Provider, reducer and persistence

- **useEffect:** Saving is a useEffect in the provider, so the reducer stays pure and every change is saved automatically.
- **Components:** They use named functions (addRecipe, updateRecipe, deleteRecipe) and never see the action shapes.
- **createRecipe:** createRecipe runs before dispatching so the reducer stays pure and deterministic.
