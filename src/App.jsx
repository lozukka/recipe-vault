import { Outlet } from "react-router";
import { useRecipes } from "./hooks/useRecipes";
import { sampleRecipes } from "./data/sampleRecipes";

function App() {
  const { addRecipe } = useRecipes();

  return (
    <>
      {import.meta.env.DEV && (
        <button
          onClick={() => sampleRecipes.forEach((recipe) => addRecipe(recipe))}
        >
          Load sample recipes
        </button>
      )}
      <Outlet />
    </>
  );
}

export default App;
