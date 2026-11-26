import { describe, expect, test } from "vitest";
import { validateDraft } from "../../src/utils/validateDraft";

// validateDraft checks the form draft (all values are text) BEFORE it is
// converted to a recipe. It returns an object of error codes, or {} when valid.
//   "required" - something is missing
//   "invalid"  - something is typed, but not acceptable
// Errors in ingredient rows are keyed by the row's rowId.

const draft = (overrides = {}) => ({
  title: "Pasta",
  sourceName: "",
  sourceURL: "",
  mealsQty: "",
  tags: "",
  ingredients: [],
  modifiedIngredients: [],
  ...overrides,
});

const row = (overrides = {}) => ({
  rowId: "row-1",
  quantity: "",
  unit: "",
  name: "",
  ...overrides,
});

const modifiedRow = (overrides = {}) => row({ note: "", ...overrides });

describe("validateDraft", () => {
  describe("valid drafts", () => {
    test("a complete draft has no errors", () => {
      const result = validateDraft(
        draft({
          sourceName: "Mummon keittokirja",
          sourceURL: "https://example.com/pasta",
          mealsQty: "4",
          tags: "pasta, uuni",
          ingredients: [row({ quantity: "2,5", unit: "dl", name: "kermaa" })],
          modifiedIngredients: [
            modifiedRow({ name: "pekonia", note: "lisäys" }),
          ],
        }),
      );

      expect(result).toStrictEqual({});
    });

    test("a draft with only a title has no errors", () => {
      expect(validateDraft(draft())).toStrictEqual({});
    });

    test("fully empty ingredient rows are skipped", () => {
      const result = validateDraft(
        draft({
          ingredients: [row({ rowId: "row-1" }), row({ rowId: "row-2" })],
          modifiedIngredients: [modifiedRow()],
        }),
      );

      expect(result).toStrictEqual({});
    });

    test("a row with only spaces counts as empty", () => {
      const result = validateDraft(
        draft({ ingredients: [row({ quantity: "  ", name: "   " })] }),
      );

      expect(result).toStrictEqual({});
    });
  });

  describe("title", () => {
    test.each([[""], ["   "]])("%j is required", (title) => {
      expect(validateDraft(draft({ title }))).toStrictEqual({
        title: "required",
      });
    });
  });

  describe("meals", () => {
    test.each([[""], ["   "], ["1"], ["12"], [" 4 "]])(
      "accepts %j",
      (mealsQty) => {
        expect(validateDraft(draft({ mealsQty }))).toStrictEqual({});
      },
    );

    test.each([["0"], ["-1"], ["1,5"], ["1.5"], ["abc"], ["2 3"]])(
      "rejects %j",
      (mealsQty) => {
        expect(validateDraft(draft({ mealsQty }))).toStrictEqual({
          mealsQty: "invalid",
        });
      },
    );
  });

  describe("source URL", () => {
    test.each([[""], ["   "], ["https://example.com"]])(
      "accepts %j",
      (sourceURL) => {
        expect(validateDraft(draft({ sourceURL }))).toStrictEqual({});
      },
    );

    test.each([["example.com"], ["javascript:alert(1)"], ["not a url"]])(
      "rejects %j",
      (sourceURL) => {
        expect(validateDraft(draft({ sourceURL }))).toStrictEqual({
          sourceURL: "invalid",
        });
      },
    );
  });

  describe("ingredient rows", () => {
    test.each([
      ["a name only", { name: "suolaa" }],
      ["a full row", { quantity: "0,5", unit: "dl", name: "kermaa" }],
      ["a quantity of zero", { quantity: "0", name: "pekonia" }],
      ["a quantity with a dot", { quantity: "0.5", name: "kermaa" }],
    ])("accepts %s", (_label, fields) => {
      const result = validateDraft(draft({ ingredients: [row(fields)] }));

      expect(result).toStrictEqual({});
    });

    test.each([
      ["a quantity without a name", { quantity: "2" }],
      ["a unit without a name", { unit: "dl" }],
      ["a quantity and a name of only spaces", { quantity: "2", name: "   " }],
    ])("requires a name for %s", (_label, fields) => {
      const result = validateDraft(draft({ ingredients: [row(fields)] }));

      expect(result).toStrictEqual({
        ingredients: { "row-1": { name: "required" } },
      });
    });

    test("rejects a quantity that is not a number", () => {
      const result = validateDraft(
        draft({ ingredients: [row({ quantity: "abc", name: "kermaa" })] }),
      );

      expect(result).toStrictEqual({
        ingredients: { "row-1": { quantity: "invalid" } },
      });
    });

    test("rejects a unit that is not in the unit list", () => {
      const result = validateDraft(
        draft({ ingredients: [row({ unit: "xyz", name: "kermaa" })] }),
      );

      expect(result).toStrictEqual({
        ingredients: { "row-1": { unit: "invalid" } },
      });
    });

    test("reports several errors in one row together", () => {
      const result = validateDraft(
        draft({ ingredients: [row({ quantity: "abc", unit: "xyz" })] }),
      );

      expect(result).toStrictEqual({
        ingredients: {
          "row-1": { name: "required", quantity: "invalid", unit: "invalid" },
        },
      });
    });

    test("only the rows with problems are in the result", () => {
      const result = validateDraft(
        draft({
          ingredients: [
            row({ rowId: "row-1", name: "suolaa" }),
            row({ rowId: "row-2", quantity: "abc", name: "kermaa" }),
            row({ rowId: "row-3", name: "pippuria" }),
          ],
        }),
      );

      expect(result).toStrictEqual({
        ingredients: { "row-2": { quantity: "invalid" } },
      });
    });
  });

  describe("modified ingredient rows", () => {
    test("accepts a full row with a note", () => {
      const result = validateDraft(
        draft({
          modifiedIngredients: [
            modifiedRow({
              quantity: "150",
              unit: "g",
              name: "pekonia",
              note: "lisäys",
            }),
          ],
        }),
      );

      expect(result).toStrictEqual({});
    });

    test("requires a name when there is only a note", () => {
      const result = validateDraft(
        draft({ modifiedIngredients: [modifiedRow({ note: "lisäys" })] }),
      );

      expect(result).toStrictEqual({
        modifiedIngredients: { "row-1": { name: "required" } },
      });
    });

    test("rejects a quantity that is not a number", () => {
      const result = validateDraft(
        draft({
          modifiedIngredients: [modifiedRow({ quantity: "abc", name: "feta" })],
        }),
      );

      expect(result).toStrictEqual({
        modifiedIngredients: { "row-1": { quantity: "invalid" } },
      });
    });

    test("errors are kept apart from the normal ingredients", () => {
      const result = validateDraft(
        draft({
          ingredients: [row({ name: "suolaa" })],
          modifiedIngredients: [modifiedRow({ quantity: "2" })],
        }),
      );

      expect(Object.keys(result)).toStrictEqual(["modifiedIngredients"]);
    });
  });

  describe("several problems at once", () => {
    test("reports every error together", () => {
      const result = validateDraft(
        draft({
          title: "",
          mealsQty: "abc",
          sourceURL: "example.com",
          ingredients: [row({ quantity: "2" })],
        }),
      );

      expect(result).toStrictEqual({
        title: "required",
        mealsQty: "invalid",
        sourceURL: "invalid",
        ingredients: { "row-1": { name: "required" } },
      });
    });
  });
});
