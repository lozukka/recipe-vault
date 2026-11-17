import { beforeEach, describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { RecipeListPage } from "../../src/pages/RecipeListPage";
import { RecipesProvider } from "../../src/context/RecipesProvider";
import { createRecipe } from "../../src/utils/recipe";
import { saveRecipes } from "../../src/utils/storage";
import { strings } from "../../src/strings";

beforeEach(() => {
  localStorage.clear();
});

// Saves the recipes first (the provider reads storage on startup),
// then renders the list page.
const renderPage = (recipes = []) => {
  saveRecipes(recipes);

  return render(
    <MemoryRouter>
      <RecipesProvider>
        <RecipeListPage />
      </RecipesProvider>
    </MemoryRouter>,
  );
};

describe("RecipeListPage", () => {
  describe("page", () => {
    test("shows the empty message when there are no recipes", () => {
      renderPage();

      expect(screen.getByText(strings.list.empty)).toBeInTheDocument();
    });

    test("shows the page heading", () => {
      renderPage();

      expect(
        screen.getByRole("heading", { level: 1, name: strings.list.title }),
      ).toBeInTheDocument();
    });

    test("shows the title of every recipe", () => {
      renderPage([
        createRecipe({ title: "Pasta" }),
        createRecipe({ title: "Soup" }),
      ]);

      expect(screen.getByText("Pasta")).toBeInTheDocument();
      expect(screen.getByText("Soup")).toBeInTheDocument();
    });

    test("shows one list item per recipe", () => {
      // no tags here, because tags can be list items too
      renderPage([
        createRecipe({ title: "Pasta" }),
        createRecipe({ title: "Soup" }),
      ]);

      expect(screen.getAllByRole("listitem")).toHaveLength(2);
    });

    test("does not show the empty message when there are recipes", () => {
      renderPage([createRecipe({ title: "Pasta" })]);

      expect(screen.queryByText(strings.list.empty)).not.toBeInTheDocument();
    });
  });

  describe("recipe card", () => {
    test("links to the detail page of the recipe", () => {
      const recipe = createRecipe({ title: "Pasta" });
      renderPage([recipe]);

      expect(screen.getByRole("link", { name: /Pasta/ })).toHaveAttribute(
        "href",
        `/recipes/${recipe.id}`,
      );
    });

    test("shows the number of meals", () => {
      renderPage([createRecipe({ title: "Pasta", mealsQty: 4 })]);

      expect(
        screen.getByText(`${strings.meals.mealsQuantity} 4`),
      ).toBeInTheDocument();
    });

    test("shows each tag with a # in front", () => {
      renderPage([createRecipe({ title: "Pasta", tags: ["pasta", "uuni"] })]);

      expect(screen.getByText("#pasta")).toBeInTheDocument();
      expect(screen.getByText("#uuni")).toBeInTheDocument();
    });

    test("shows when the recipe was last cooked", () => {
      renderPage([
        createRecipe({
          title: "Pasta",
          lastCookedAt: "2026-10-28T12:00:00.000Z",
        }),
      ]);

      expect(
        screen.getByText(strings.meals.lastCookedAt, { exact: false }),
      ).toBeInTheDocument();
      expect(screen.getByText("28.10.2026")).toBeInTheDocument();
    });

    test("shows nothing about cooking when the recipe has not been cooked", () => {
      renderPage([createRecipe({ title: "Pasta" })]);

      expect(
        screen.queryByText(strings.meals.lastCookedAt, { exact: false }),
      ).not.toBeInTheDocument();
    });
  });
});
