import { useContext } from "react";
import { RecipesContext } from "../context/RecipesContext";

export function useRecipes() {
  const context = useContext(RecipesContext);

  // TODO 5: if context is null, we're outside the provider.
  //         Throw a clear error so the mistake is easy to find.
  if (context === null) {
    throw new Error("useRecipes must be used inside a <RecipesProvider>");
  }

  return context;
}
