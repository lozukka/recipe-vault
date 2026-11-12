import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { IngredientRow } from "../../src/components/IngredientRow";

const renderRow = (ingredient) =>
  render(
    <ul>
      <IngredientRow ingredient={ingredient} />
    </ul>,
  );

describe("IngredientRow", () => {
  test("shows the formatted ingredient as a list item", () => {
    renderRow({ quantity: 2, unit: "dl", name: "kermaa" });

    expect(screen.getByRole("listitem")).toHaveTextContent("2 dl kermaa");
  });

  test("shows an ingredient with only a name", () => {
    renderRow({ quantity: null, unit: null, name: "suolaa" });

    expect(screen.getByRole("listitem")).toHaveTextContent("suolaa");
  });

  test("shows the note of a modified ingredient", () => {
    renderRow({ quantity: 150, unit: "g", name: "pekonia", note: "lisäys" });

    expect(screen.getByRole("listitem")).toHaveTextContent(
      "150 g pekonia (lisäys)",
    );
  });
});
