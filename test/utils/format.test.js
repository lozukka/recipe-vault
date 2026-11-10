import { describe, expect, test } from "vitest";
import {
  formatQuantity,
  formatIngredient,
  isSafeURL,
  formatDate,
} from "../../src/utils/format";

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

describe("isSafeURL", () => {
  describe("safe links", () => {
    test.each([
      "https://example.com",
      "http://example.com",
      "https://example.com/path/to/recipe?id=1&lang=fi#ingredients",
      "HTTPS://EXAMPLE.COM",
    ])("accepts %j", (input) => {
      expect(isSafeURL(input)).toBe(true);
    });
  });

  describe("unsafe or unusable links", () => {
    test.each([
      // dangerous protocols
      "javascript:alert(1)",
      "JaVaScRiPt:alert(1)",
      " javascript:alert(1)", // leading space
      "java\tscript:alert(1)", // tab inside the protocol
      "data:text/html,<script>alert(1)</script>",
      // other protocols that aren't web pages
      "ftp://example.com",
      "mailto:someone@example.com",
      // not a full URL
      "example.com", // no protocol
      "//example.com",
      "https://",
      "http//example.com",
      // empty
      "",
      "   ",
    ])("rejects %j", (input) => {
      expect(isSafeURL(input)).toBe(false);
    });

    test.each([null, undefined, 42, {}, []])(
      "rejects the non-string value %j",
      (input) => {
        expect(isSafeURL(input)).toBe(false);
      },
    );
  });
});

describe("formatDate", () => {
  test.each([
    ["2026-11-09T12:00:00.000Z", "9.11.2026"],
    ["2026-01-05T12:00:00.000Z", "5.1.2026"],
    [null, ""],
    [undefined, ""],
    ["", ""],
    ["not a date", ""],
  ])("formats %j as '%s'", (input, expected) => {
    expect(formatDate(input)).toBe(expected);
  });
});
