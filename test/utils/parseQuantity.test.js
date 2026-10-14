import { describe, expect, test } from "vitest";
import parseQuantity from "../../src/utils/parseQuantity";

describe("parseQuantity", () => {
  describe("valid input", () => {
    test.each([
      ["2", 2],
      ["0,5", 0.5],
      ["0.5", 0.5],
      [" 2 ", 2],
      [",5", 0.5],
      ["2,", 2],
      ["0", 0],
    ])('parses "%s" as %d', (input, expected) => {
      expect(parseQuantity(input)).toBe(expected);
    });
  });

  describe("empty input", () => {
    test.each([
      ["", null],
      [" ", null],
    ])("empty input returns as null", (input, expected) => {
      expect(parseQuantity(input)).toBe(expected);
    });
  });

  describe("invalid input", () => {
    test.each([
      ["abc", undefined],
      ["-1", undefined],
      ["1/2", undefined],
      ["1,5,5", undefined],
      ["1e3", undefined],
      ["Infinity", undefined],
      ["0x10", undefined],
      ["0b11", undefined],
      [2, undefined],
    ])("invalid input %s returns as undefined", (input, expected) => {
      expect(parseQuantity(input)).toBe(expected);
    });
  });
});

//test cases: "2", "0,5", "0.5","0", "", " ", "abc", "-1", "1/2"
