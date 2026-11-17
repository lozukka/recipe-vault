import { beforeEach, describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { RecipeDetailPage } from "../../src/pages/RecipeDetailPage";
import { RecipesProvider } from "../../src/context/RecipesProvider";
import { saveRecipes } from "../../src/utils/storage";
import { strings } from "../../src/strings";
import { createRecipe } from "../../src/utils/recipe";

beforeEach(() => {
  localStorage.clear();
});

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
  test("shows a not found message for an unknown id", () => {
    renderDetail("does-not-exist");

    expect(screen.getByText(strings.detail.notFound)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: strings.detail.backToList }),
    ).toHaveAttribute("href", "/");
  });

  test("shows the title of the recipe", () => {
    const recipe = createRecipe({ title: "Pasta" });
    saveRecipes([recipe]);

    renderDetail(recipe.id);

    expect(
      screen.getByRole("heading", { level: 1, name: "Pasta" }),
    ).toBeInTheDocument();
  });
});
