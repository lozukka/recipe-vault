import { useRecipes } from "./hooks/useRecipes";
import { sampleRecipes } from "./data/sampleRecipes";

function App() {
  const { recipes, addRecipe, updateRecipe, deleteRecipe } = useRecipes();

  return (
    <>
      {import.meta.env.DEV && (
        <button
          onClick={() => sampleRecipes.forEach((recipe) => addRecipe(recipe))}
        >
          Load sample recipes
        </button>
      )}
      <div>
        <p>Recipes: {recipes.length}</p>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            {recipe.title}{" "}
            <button
              onClick={() =>
                updateRecipe({ ...recipe, title: `${recipe.title}!` })
              }
            >
              Add !
            </button>{" "}
            <button onClick={() => deleteRecipe(recipe.id)}>Delete</button>
          </li>
        ))}
      </div>
    </>
  );
}

export default App;
