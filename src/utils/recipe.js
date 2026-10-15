//normalizeTags
//createRecipe
//validateRecipe

function createRecipe(fields) {
  const recipe = {
    id: crypto.randomUUID(),
    title: fields.title,
    sourceURL: fields.sourceURL,
    mealsQty: fields.mealsQty,
    ingredients: fields.ingredients, //[{quantity(optional), unit(optional), name*}],
    modifiedIngredients: fields.modifiedIngredients, //[{quantity(optional), unit(optional), name, note(optional)}],
    tags: [],
    createdAt: new Date(year.monthIndex, day),
    lastCookedAt: new Date(year.monthIndex, day),
  };
}

export default createRecipe;
