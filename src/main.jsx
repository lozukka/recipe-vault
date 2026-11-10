import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme.js";
import { GlobalStyle } from "./styles/GlobalStyle.js";
import { RecipeListPage } from "./pages/RecipeListPage.jsx";
import RecipeFormPage from "./pages/RecipeFormPage.jsx";
import RecipeDetailPage from "./pages/RecipeDetailPage.jsx";
import { RecipesProvider } from "./context/RecipesProvider.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <RecipeListPage /> }, // homepage
      { path: "new", element: <RecipeFormPage /> }, // new recipe
      { path: "id", element: <RecipeDetailPage /> }, //one recipe
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RecipesProvider>
        <RouterProvider router={router} />
      </RecipesProvider>
    </ThemeProvider>
  </StrictMode>,
);
