import { useRecipes } from "../hooks/useRecipes";
import { RecipeCard } from "../components/RecipeCard";
import { strings } from "../strings";

export function RecipeListPage() {
  const { recipes } = useRecipes();

  return (
    <>
      <main>
        <h1>{strings.list.title}</h1>
        {recipes.length === 0 ? (
          <p>{strings.list.empty}</p>
        ) : (
          <ul>
            {recipes.map((recipe) => (
              <li key={recipe.id}>
                <RecipeCard recipe={recipe} />
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}
