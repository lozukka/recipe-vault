import { describe, expect, test } from "vitest";
import { createIngredient, createRecipe } from "../../src/utils/recipe";
import { createID } from "../../src/utils/recipe";
import { createTimestamp } from "../../src/utils/recipe";

describe("createRecipe", () => {
  describe("createIngredient", () => {
    test("returns a full ingredient as given", () => {
      const result = createIngredient({
        quantity: 2,
        unit: "dl",
        name: "kerma",
      });
      expect(result).toEqual({ quantity: 2, unit: "dl", name: "kerma" });
    });

    test("name-only ingredient gets quantity and unit: null", () => {
      const result = createIngredient({
        name: "kerma",
      });
      expect(result).toStrictEqual({
        quantity: null,
        unit: null,
        name: "kerma",
      });
    });

    test("quantity 0 stays 0", () => {
      const result = createIngredient({
        quantity: 0,
        unit: "dl",
        name: "kerma",
      });
      expect(result).toStrictEqual({ quantity: 0, unit: "dl", name: "kerma" });
    });

    test("unit: '' becomes null", () => {
      const result = createIngredient({
        quantity: 2,
        unit: "",
        name: "kerma",
      });
      expect(result).toStrictEqual({ quantity: 2, unit: null, name: "kerma" });
    });

    test("surrounding spaces are trimmed from name", () => {
      const result = createIngredient({
        quantity: 2,
        unit: "dl",
        name: " kerma ",
      });
      expect(result).toStrictEqual({ quantity: 2, unit: "dl", name: "kerma" });
    });
  });
  describe("create ID", () => {
    test("returns a string", () => {
      const result = createID();
      expect(typeof result).toBe("string");
    });

    test("returns a UUID-shaped string", () => {
      const result = createID();
      expect(result).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
      );
    });

    test("returns a different id each time", () => {
      const first = createID();
      const second = createID();
      expect(first).not.toBe(second);
    });
  });
  describe("create a date", () => {
    test("returns a valid ISO date string", () => {
      const result = createTimestamp();
      expect(new Date(result).toISOString()).toBe(result);
    });
    test("returns the current time", () => {
      const before = Date.now();
      const result = createTimestamp();
      const after = Date.now();

      const time = new Date(result).getTime();
      expect(time).toBeGreaterThanOrEqual(before);
      expect(time).toBeLessThanOrEqual(after);
    });
  });
  describe("create one recipe", () => {
    test("title is trimmed", () => {
      const result = createRecipe({
        title: " Pasta ",
        sourceURL: null,
        sourceName: null,
        mealsQty: 1,
        ingredients: [],
        modifiedIngredients: [],
        tags: [],
      });
      expect(result).toStrictEqual({
        id: expect.any(String),
        title: "Pasta",
        sourceURL: null,
        sourceName: null,
        mealsQty: 1,
        ingredients: [],
        modifiedIngredients: [],
        tags: [],
        createdAt: expect.any(String),
        lastCookedAt: null,
      });
    });
    test("full input", () => {
      const result = createRecipe({
        title: " Pasta ",
        sourceURL: "Valio",
        sourceName: "website ",
        mealsQty: 3,
        ingredients: [{ quantity: 2, unit: "dl", name: "kermaa" }],
        modifiedIngredients: [
          { quantity: 2, unit: "dl", name: "kermaa", note: null },
        ],
        tags: [],
      });
      expect(result).toStrictEqual({
        id: expect.any(String),
        title: "Pasta",
        sourceURL: "Valio",
        sourceName: "website",
        mealsQty: 3,
        ingredients: [{ quantity: 2, unit: "dl", name: "kermaa" }],
        modifiedIngredients: [
          { quantity: 2, unit: "dl", name: "kermaa", note: null },
        ],
        tags: [],
        createdAt: expect.any(String),
        lastCookedAt: null,
      });
    });

    test("keeps a given lastCookedAt", () => {
      const result = createRecipe({
        title: "Pasta",
        lastCookedAt: "2026-10-28T12:00:00.000Z",
      });

      expect(result.lastCookedAt).toBe("2026-10-28T12:00:00.000Z");
    });
  });
});
