import { describe, expect, test } from "vitest";
import { recipesReducer } from "../../src/context/recipesReducer";

describe("recipesReducer", () => {
  describe("added", () => {
    test("adds a recipe to an empty list", () => {
      const state = [];
      const recipe = { id: "1", title: "Pasta" };

      const result = recipesReducer(state, { type: "added", recipe });

      expect(result).toStrictEqual([recipe]);
    });
  });
});
