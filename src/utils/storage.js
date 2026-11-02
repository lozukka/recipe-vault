//loadRecipes
//saveRecipes
import { STORAGE_KEY, BACKUP_KEY, STORAGE_VERSION } from "../constants";

export const loadRecipes = () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw === null) return [];

  try {
    const stored = JSON.parse(raw);
    return stored.recipes;
  } catch {
    localStorage.setItem(BACKUP_KEY, raw);
    localStorage.removeItem(STORAGE_KEY);
    return [];
  }
};
