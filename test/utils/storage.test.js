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
});
