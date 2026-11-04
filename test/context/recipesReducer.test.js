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
    test("adds a recipe to the list and keeps the existing list", () => {
      const state = [{ id: "1", title: "Pasta" }];
      const recipe = { id: "2", title: "Soup" };

      const result = recipesReducer(state, { type: "added", recipe });

      expect(result).toStrictEqual([{ id: "1", title: "Pasta" }, recipe]);
    });
    test("does not modify the old state", () => {
      const state = Object.freeze([{ id: "1", title: "Pasta" }]);

      const result = recipesReducer(state, {
        type: "added",
        recipe: { id: "2", title: "Soup" },
      });

      expect(result).toHaveLength(2);
      expect(state).toHaveLength(1);
    });
  });

  describe("deleted", () => {
    test("removes the recipe with matching id and keeps the rest", () => {
      const state = [
        { id: "1", title: "Pasta" },
        { id: "2", title: "Soup" },
      ];

      const result = recipesReducer(state, { type: "deleted", id: "1" });

      expect(result).toStrictEqual([{ id: "2", title: "Soup" }]);
    });
    test("if ID doesn't exist, leave the list unchanged", () => {
      const state = [
        { id: "1", title: "Pasta" },
        { id: "2", title: "Soup" },
      ];

      const result = recipesReducer(state, { type: "deleted", id: "3" });

      expect(result).toStrictEqual(state);
    });
  });
});
