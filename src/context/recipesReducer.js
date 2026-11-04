export const recipesReducer = (state, action) => {
  const recipes = state;

  switch (action.type) {
    case "added":
      const newRecipe = action.recipe;

      const newRecipes = [...recipes, newRecipe];
      return newRecipes;
    case "updated":
      return recipes.map((recipe) =>
        recipe.id === action.recipe.id ? action.recipe : recipe,
      );

    case "deleted":
      return recipes.filter((recipe) => recipe.id !== action.id);
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};
