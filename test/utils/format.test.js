import { describe, expect, test } from "vitest";
import { formatQuantity, formatIngredient } from "../../src/utils/format";

describe("formatQuantity", () => {
  test.each([
    [null, ""],
    [2, "2"],
    [0.5, "0,5"],
    [0, "0"],
    [12.25, "12,25"],
  ])("formats %s as '%s'", (input, expected) => {
    expect(formatQuantity(input)).toBe(expected);
  });
});

describe("formatIngredient", () => {
  test.each([
    [{ quantity: 2, unit: "dl", name: "kermaa" }, "2 dl kermaa"],
    [{ quantity: 0.5, unit: "kg", name: "porkkanaa" }, "0,5 kg porkkanaa"],
    [{ quantity: null, unit: null, name: "suolaa" }, "suolaa"],
    [{ quantity: 3, unit: null, name: "kananmunaa" }, "3 kananmunaa"],
    [
      { quantity: 0, unit: "g", name: "jauhelihaa", note: "kasviversio" },
      "0 g jauhelihaa (kasviversio)",
    ],
  ])("formats %j as '%s'", (input, expected) => {
    expect(formatIngredient(input)).toBe(expected);
  });
});
