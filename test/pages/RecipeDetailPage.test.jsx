import { beforeEach, describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { RecipeDetailPage } from "../../src/pages/RecipeDetailPage";
import { RecipesProvider } from "../../src/context/RecipesProvider";
import { createRecipe } from "../../src/utils/recipe";
import { saveRecipes } from "../../src/utils/storage";
import { strings } from "../../src/strings";

beforeEach(() => {
  localStorage.clear();
});

// Saves the recipe to storage first (the provider reads storage on startup),
// then renders the detail page at the recipe's URL.
const renderRecipe = (fields) => {
  const recipe = createRecipe(fields);
  saveRecipes([recipe]);
  return renderDetail(recipe.id);
};

const renderDetail = (id) =>
  render(
    <MemoryRouter initialEntries={[`/recipes/${id}`]}>
      <RecipesProvider>
        <Routes>
          <Route path="/recipes/:id" element={<RecipeDetailPage />} />
        </Routes>
      </RecipesProvider>
    </MemoryRouter>,
  );

describe("RecipeDetailPage", () => {
  describe("not found and title", () => {
    test("shows a not found message for an unknown id", () => {
      renderDetail("does-not-exist");

      expect(screen.getByText(strings.detail.notFound)).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: strings.common.backToList }),
      ).toHaveAttribute("href", "/");
    });

    test("shows the title of the recipe", () => {
      renderRecipe({ title: "Pasta" });

      expect(
        screen.getByRole("heading", { level: 1, name: "Pasta" }),
      ).toBeInTheDocument();
    });
  });

  describe("ingredients", () => {
    test("shows the ingredients as list items under a heading", () => {
      renderRecipe({
        title: "Pasta",
        ingredients: [
          { quantity: 2, unit: "dl", name: "kermaa" },
          { name: "suolaa" },
        ],
      });

      expect(
        screen.getByRole("heading", {
          level: 2,
          name: strings.detail.ingredients,
        }),
      ).toBeInTheDocument();
      expect(screen.getAllByRole("listitem")).toHaveLength(2);
      expect(screen.getByText("2 dl kermaa")).toBeInTheDocument();
      expect(screen.getByText("suolaa")).toBeInTheDocument();
    });
  });

  describe("modified ingredients", () => {
    test("shows the heading and the rows when there are modified ingredients", () => {
      renderRecipe({
        title: "Makaroonilaatikko",
        modifiedIngredients: [
          { quantity: 150, unit: "g", name: "pekonia", note: "lisäys" },
        ],
      });

      expect(
        screen.getByRole("heading", {
          name: strings.detail.modifiedIngredients,
        }),
      ).toBeInTheDocument();
      expect(screen.getByText("150 g pekonia (lisäys)")).toBeInTheDocument();
    });

    test("does not show the heading when there are none", () => {
      renderRecipe({ title: "Pannukakku" });

      expect(
        screen.queryByRole("heading", {
          name: strings.detail.modifiedIngredients,
        }),
      ).not.toBeInTheDocument();
    });
  });

  describe("source", () => {
    test("name and safe link: shows the name as a link", () => {
      renderRecipe({
        title: "Pasta",
        sourceName: "Mummon keittokirja",
        sourceURL: "https://example.com/pasta",
      });

      expect(
        screen.getByRole("link", { name: "Mummon keittokirja" }),
      ).toHaveAttribute("href", "https://example.com/pasta");
    });

    test("name only: shows the name as plain text, not a link", () => {
      renderRecipe({ title: "Pasta", sourceName: "Mummon keittokirja" });

      expect(screen.getByText("Mummon keittokirja")).toBeInTheDocument();
      expect(
        screen.queryByRole("link", { name: "Mummon keittokirja" }),
      ).not.toBeInTheDocument();
    });

    test("safe link only: shows a generic link text", () => {
      renderRecipe({ title: "Pasta", sourceURL: "https://example.com/pasta" });

      expect(
        screen.getByRole("link", { name: strings.detail.openSource }),
      ).toHaveAttribute("href", "https://example.com/pasta");
    });

    test("neither: shows no source", () => {
      renderRecipe({ title: "Pasta" });

      expect(
        screen.queryByRole("link", { name: strings.detail.openSource }),
      ).not.toBeInTheDocument();
      // the only link on the page is the one back to the list
      expect(screen.getAllByRole("link")).toHaveLength(1);
    });

    test("unsafe link with a name: shows the name as plain text, not a link", () => {
      renderRecipe({
        title: "Pasta",
        sourceName: "Mummon keittokirja",
        sourceURL: "javascript:alert(1)",
      });

      expect(screen.getByText("Mummon keittokirja")).toBeInTheDocument();
      expect(
        screen.queryByRole("link", { name: "Mummon keittokirja" }),
      ).not.toBeInTheDocument();
    });

    test("unsafe link without a name: shows no link", () => {
      renderRecipe({ title: "Pasta", sourceURL: "javascript:alert(1)" });

      expect(
        screen.queryByRole("link", { name: strings.detail.openSource }),
      ).not.toBeInTheDocument();
    });
  });

  describe("tags", () => {
    test("shows each tag with a # in front", () => {
      renderRecipe({ title: "Pasta", tags: ["pasta", "uuni"] });

      expect(screen.getByText("#pasta")).toBeInTheDocument();
      expect(screen.getByText("#uuni")).toBeInTheDocument();
    });
  });
});
