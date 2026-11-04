//loadRecipes
//saveRecipes
import { STORAGE_KEY, BACKUP_KEY, STORAGE_VERSION } from "../constants";

const backupAndClear = (raw) => {
  localStorage.setItem(BACKUP_KEY, raw);
  localStorage.removeItem(STORAGE_KEY);
};

const isValidStored = (stored) =>
  stored !== null &&
  typeof stored === "object" &&
  stored.version === STORAGE_VERSION &&
  Array.isArray(stored.recipes);

export const loadRecipes = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) return [];

    try {
      const stored = JSON.parse(raw);
      if (isValidStored(stored)) return stored.recipes;
    } catch {
      // broken JSON: fall through to the cleanup below
    }

    backupAndClear(raw);
    return [];
  } catch {
    // storage is unavailable (blocked or broken)
    return [];
  }
};

export const saveRecipes = (recipes) => {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ version: STORAGE_VERSION, recipes }),
    );
    return true;
  } catch {
    //storage is unavailable (blocked or broken)
    return false;
  }
};
