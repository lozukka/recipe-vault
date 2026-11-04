export const recipesReducer = (state, action) => {
  const recipes = state;

  switch (action.type) {
    case "added":
      // TODO: a new array with the existing recipes and the new one at the end

      const newRecipe = action.recipe;

      const newRecipes = [...recipes, newRecipe];
      return newRecipes;
    case "updated":
      // TODO: a new array where the recipe with a matching id is replaced

      return recipes.map((recipe) =>
        recipe.id === action.recipe.id ? action.recipe : recipe,
      );

    case "deleted":
      // TODO: a new array without the recipe with that id
      return recipes.filter((recipe) => recipe.id !== action.id);
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};
