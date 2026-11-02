import { beforeEach, describe, expect, test } from "vitest";
import { loadRecipes } from "../../src/utils/storage";
import { createRecipe } from "../../src/utils/recipe";
import { STORAGE_KEY, BACKUP_KEY, STORAGE_VERSION } from "../../src/constants";

beforeEach(() => {
  localStorage.clear();
});

describe("loadRecipes", () => {
  describe("successful paths", () => {
    test("empty storage returns empty array", () => {
      const result = loadRecipes();
      expect(result).toStrictEqual([]);
    });
    test("valid stored data returns the recipes", () => {
      const recipe = createRecipe({ title: "Pasta" });
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ version: STORAGE_VERSION, recipes: [recipe] }),
      );
      const result = loadRecipes();
      expect(result).toStrictEqual([recipe]);
    });
    test("empty list is valid", () => {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ version: STORAGE_VERSION, recipes: [] }),
      );
      const result = loadRecipes();
      expect(result).toStrictEqual([]);
    });
  });
  //move data to BACKUP_KEY and remove the original
  describe("corrupted data tests", () => {
    test("broken JSON returns empty array", () => {
      localStorage.setItem(STORAGE_KEY, "{not json");

      const result = loadRecipes();

      expect(result).toStrictEqual([]);
    });
    test("broken JSON is saved to the backup key", () => {
      localStorage.setItem(STORAGE_KEY, "{not json");
      loadRecipes();
      expect(localStorage.getItem(BACKUP_KEY)).toBe("{not json");
    });
    test("broken JSON is removed from the main key", () => {
      localStorage.setItem(STORAGE_KEY, "{not json");
      loadRecipes();
      expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
    });
  });
});
