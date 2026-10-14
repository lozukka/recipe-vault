import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme.js";
import { GlobalStyle } from "./styles/GlobalStyle.js";
import RecipeListPage from "./pages/RecipeListPage.jsx";
import RecipeFormPage from "./pages/RecipeFormPage.jsx";
import RecipeDetailPage from "./pages/RecipeDetailPage.jsx";

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
  <ThemeProvider theme={theme}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </ThemeProvider>,
);
