import { createRecipe } from "../utils/recipe";

// Sample data for development. Each recipe is built with createRecipe,
// so ids and timestamps are generated when this module is loaded.
// The three recipes are deliberately different, to show different cases in the UI.

// 1. A full recipe: many ingredients, tags, a source link,
//    modified ingredients with notes, and a quantity of 0 ("leave this out")
const makaroonilaatikko = createRecipe({
  title: "Makaroonilaatikko",
  sourceURL:
    "https://www.valio.fi/reseptit/liha-makaronilaatikko/?gclsrc=aw.ds&gad_source=1&gad_campaignid=76207099&gbraid=0AAAAADebTUvEP76pgfeKB9BmSze6jugSO&gclid=Cj0KCQiA77DXBhCHARIsAHf2MNpZz2PR4Esi9ghCJxs-apFoTuj5FqCSwfAlKB7ITtkuRlztOJpDoEcaAtcqEALw_wcB",
  mealsQty: 4,
  ingredients: [
    { quantity: 300, unit: "g", name: "makaronia" },
    { quantity: 400, unit: "g", name: "jauhelihaa" },
    { quantity: 1, unit: "kpl", name: "sipuli" },
    { quantity: 3, unit: "kpl", name: "kananmunaa" },
    { quantity: 5, unit: "dl", name: "maitoa" },
    { quantity: 1, unit: "tl", name: "suolaa" },
    { name: "mustapippuria" }, // no quantity or unit
  ],
  modifiedIngredients: [
    { quantity: 150, unit: "g", name: "pekonia", note: "lisäys" },
    { quantity: 100, unit: "g", name: "fetaa", note: "korvaa osa juustosta" },
    {
      quantity: 0,
      unit: "g",
      name: "jauhelihaa",
      note: "kasviversio: jätä pois",
    },
  ],
  tags: ["arkiruoka", "uuni", "pasta"],
});

// 2. A long title and a decimal quantity, to test layout
const naudanlihakeitto = createRecipe({
  title: "Hitaasti haudutettu naudanlihakeitto juureksilla ja yrteillä",
  mealsQty: 6,
  ingredients: [
    { quantity: 800, unit: "g", name: "naudan paistia" },
    { quantity: 0.5, unit: "kg", name: "porkkanaa" },
    { quantity: 3, unit: "kpl", name: "perunaa" },
    { quantity: 1, unit: "l", name: "lihalientä" },
    { name: "suolaa" },
  ],
  tags: ["keitto", "liha"],
});

// 3. The minimum: only a title, to see how empty values are shown
const pannukakku = createRecipe({ title: "Pannukakku" });

export const sampleRecipes = [makaroonilaatikko, naudanlihakeitto, pannukakku];
