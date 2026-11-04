import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { loadRecipes, saveRecipes } from "../../src/utils/storage";
import { createRecipe } from "../../src/utils/recipe";
import { STORAGE_KEY, BACKUP_KEY, STORAGE_VERSION } from "../../src/constants";

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  vi.restoreAllMocks();
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
  // Rule: stored data that can't be read, or isn't exactly the shape and
  // version we expect, is moved to BACKUP_KEY, removed from STORAGE_KEY,
  // and loadRecipes returns [].
  describe("valid JSON in the wrong shape", () => {
    test.each([
      ["missing recipes", JSON.stringify({ version: STORAGE_VERSION })],
      [
        "recipes not an array",
        JSON.stringify({ version: STORAGE_VERSION, recipes: "oops" }),
      ],
      ["array instead of object", "[]"],
      ["a number", "42"],
      ["null", "null"],
      ["wrong version", JSON.stringify({ version: 99, recipes: [] })],
    ])("returns [] and backs up when stored data is %s", (_name, raw) => {
      localStorage.setItem(STORAGE_KEY, raw);

      expect(loadRecipes()).toStrictEqual([]);
      expect(localStorage.getItem(BACKUP_KEY)).toBe(raw);
      expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
    });
  });

  describe("localStorage throws", () => {
    test("returns an empty array when reading from storage throws", () => {
      vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
        throw new Error("storage is blocked");
      });

      expect(loadRecipes()).toStrictEqual([]);
    });

    test("returns an empty array when the backup of corrupted data fails", () => {
      localStorage.setItem(STORAGE_KEY, "{not json");
      vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
        throw new Error("storage is full");
      });

      expect(loadRecipes()).toStrictEqual([]);
      expect(localStorage.getItem(STORAGE_KEY)).toBe("{not json");
    });
  });
});

describe("saveRecipes", () => {
  describe("successful paths", () => {
    test("writes the wrapper object", () => {
      const recipe = createRecipe({ title: "Pasta" });
      const expected = { version: STORAGE_VERSION, recipes: [recipe] };

      const result = saveRecipes([recipe]);

      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
      expect(stored).toStrictEqual(expected);
      expect(result).toBe(true);
    });
    test("saves an empty list", () => {
      const expected = { version: STORAGE_VERSION, recipes: [] };

      const result = saveRecipes([]);

      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
      expect(stored).toStrictEqual(expected);
      expect(result).toBe(true);
    });
    test("overwrites earlier data", () => {
      const first = createRecipe({ title: "Pasta" });
      const second = createRecipe({ title: "Soup" });

      saveRecipes([first]);
      saveRecipes([second]);

      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
      expect(stored.recipes).toStrictEqual([second]);
    });
  });
  describe("storage throws", () => {
    test("returns false when storage throws", () => {
      vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
        throw new Error("storage is full");
      });

      const result = saveRecipes([createRecipe({ title: "Pasta" })]);

      expect(result).toBe(false);
    });
  });
});

describe("save and load together", () => {
  test("loads what was saved", () => {
    const recipe = createRecipe({
      title: "Pasta",
      ingredients: [{ quantity: 2, unit: "dl", name: "kerma" }],
      tags: ["pasta"],
    });

    saveRecipes([recipe]);

    expect(loadRecipes()).toStrictEqual([recipe]);
  });
});
