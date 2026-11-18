import { describe, expect, test } from "vitest";
import { normalizeTags } from "../../src/utils/tags";

describe("normalizeTags", () => {
  describe("splitting", () => {
    test.each([
      ["pasta", ["pasta"]],
      ["pasta, uuni", ["pasta", "uuni"]],
      ["pasta,uuni", ["pasta", "uuni"]],
      ["pasta uuni", ["pasta", "uuni"]],
      ["  pasta ,  uuni  ", ["pasta", "uuni"]],
    ])("splits %j into %j", (input, expected) => {
      expect(normalizeTags(input)).toStrictEqual(expected);
    });
  });

  describe("cleaning", () => {
    test.each([
      ["Pasta, UUNI", ["pasta", "uuni"]],
      ["SÄIlyke, Öljy", ["säilyke", "öljy"]],
      ["#pasta, #uuni", ["pasta", "uuni"]],
      ["##pasta", ["pasta"]],
    ])("cleans %j into %j", (input, expected) => {
      expect(normalizeTags(input)).toStrictEqual(expected);
    });
  });

  describe("duplicates and order", () => {
    test.each([
      ["pasta, Pasta, #pasta", ["pasta"]],
      ["uuni, pasta, uuni", ["uuni", "pasta"]],
    ])("handles %j as %j", (input, expected) => {
      expect(normalizeTags(input)).toStrictEqual(expected);
    });
  });

  describe("empty and invalid input", () => {
    test.each([[""], ["   "], [",,,"], ["#"], [", # ,"]])(
      "returns an empty array for %j",
      (input) => {
        expect(normalizeTags(input)).toStrictEqual([]);
      },
    );

    test.each([[null], [undefined], [42], [["pasta"]]])(
      "returns an empty array for the non-string %j",
      (input) => {
        expect(normalizeTags(input)).toStrictEqual([]);
      },
    );
  });
});
