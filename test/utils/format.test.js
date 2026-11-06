import { describe, expect, test } from "vitest";
import { formatQuantity } from "../../src/utils/format";

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
