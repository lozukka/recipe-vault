//loadRecipes
//saveRecipes
import { STORAGE_KEY, STORAGE_VERSION } from "../constants";

export const loadRecipes = () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw === null) return [];

  const stored = JSON.parse(raw);
  return stored.recipes;
};
