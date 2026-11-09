import { beforeEach, describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { RecipeListPage } from "../../src/pages/RecipeListPage";
import { RecipesProvider } from "../../src/context/RecipesProvider";
import { strings } from "../../src/strings";

beforeEach(() => {
  localStorage.clear();
});

const renderPage = () =>
  render(
    <MemoryRouter>
      <RecipesProvider>
        <RecipeListPage />
      </RecipesProvider>
    </MemoryRouter>,
  );

describe("RecipeListPage", () => {
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
});
