import { useEffect, useReducer } from "react";
import { RecipesContext } from "./RecipesContext";
import { recipesReducer } from "./recipesReducer";
import { loadRecipes, saveRecipes } from "../utils/storage";
import { createRecipe } from "../utils/recipe";

export function RecipesProvider({ children }) {
  const [recipes, dispatch] = useReducer(
    recipesReducer,
    undefined,
    loadRecipes,
  );

  useEffect(() => {
    saveRecipes(recipes);
  }, [recipes]);

  const addRecipe = (fields) => {
    const recipe = createRecipe(fields);
    dispatch({
      type: "added",
      recipe,
    });
    return recipe;
  };

  const updateRecipe = (recipe) => {
    dispatch({
      type: "updated",
      recipe,
    });
  };

  const deleteRecipe = (id) => {
    dispatch({
      type: "deleted",
      id,
    });
  };

  const value = { recipes, addRecipe, updateRecipe, deleteRecipe };

  return (
    <RecipesContext.Provider value={value}>{children}</RecipesContext.Provider>
  );
}
