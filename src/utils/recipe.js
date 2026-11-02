//normalizeTags
//createRecipe
//validateRecipe

//function createRecipe(fields) {
/**const recipe = {
    id: crypto.randomUUID(),
    title: fields.title,
    sourceURL: fields.sourceURL,
    mealsQty: fields.mealsQty,
    ingredients: fields.ingredients, //[{quantity(optional), unit(optional), name*}],
    modifiedIngredients: fields.modifiedIngredients, //[{quantity(optional), unit(optional), name, note(optional)}],
    tags: [],
    createdAt: new Date(year.monthIndex, day),
    lastCookedAt: new Date(year.monthIndex, day),
  };*/
//}

// export default createRecipe;

export const createID = () => {
  return crypto.randomUUID();
};

export const createIngredient = ({ quantity, unit, name }) => {
  return {
    quantity: quantity ?? null,
    unit: unit || null,
    name: name.trim(),
  };
};

export const createModifiedIngredient = ({ quantity, unit, name, note }) => {
  return {
    quantity: quantity ?? null,
    unit: unit || null,
    name: name.trim(),
    note: note || null,
  };
};

export const createTimestamp = () => {
  return new Date().toISOString();
};

export const createRecipe = (fields) => {
  const newRecipe = {
    id: createID(),
    title: fields.title.trim(),
    sourceURL: fields.sourceURL || null,
    mealsQty: fields.mealsQty ?? 1,
    ingredients: (fields.ingredients ?? []).map(createIngredient),
    modifiedIngredients: (fields.modifiedIngredients ?? []).map(
      createModifiedIngredient,
    ),
    tags: fields.tags ?? [],
    createdAt: createTimestamp(),
    lastCookedAt: null,
  };

  return newRecipe;
};
