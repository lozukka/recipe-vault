import { useRecipes } from "./hooks/useRecipes";
import { sampleRecipes } from "./data/sampleRecipes";

function App() {
  const { recipes, addRecipe, updateRecipe, deleteRecipe } = useRecipes();
  return (
    <>
      <button onClick={() => addRecipe(sampleRecipes.makaroonilaatikko)}>
        Add test data
      </button>
      <div>
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
