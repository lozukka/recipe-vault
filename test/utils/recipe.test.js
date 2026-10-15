import { describe, expect, test } from "vitest";
// import createRecipe from "../../src/utils/recipe";
import { createIngredient } from "../../src/utils/recipe";

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
});
