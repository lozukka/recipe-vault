import { Link, useParams } from "react-router";
import { useRecipes } from "../hooks/useRecipes";
import { IngredientRow } from "../components/IngredientRow";
import { RecipeSource } from "../components/RecipeSource";
import { strings } from "../strings";
import { formatDate } from "../utils/format";

export function RecipeDetailPage() {
  const { id } = useParams();
  const { recipes } = useRecipes();

  const recipe = recipes.find((item) => item.id === id);

  if (!recipe) {
    return (
      <main>
        <p>{strings.detail.notFound}</p>
        <Link to="/">{strings.common.backToList}</Link>
      </main>
    );
  }
  return (
    <main>
      <Link to="/">{strings.common.backToList}</Link>
      <h1>{recipe.title}</h1>

      <RecipeSource recipe={recipe} />
      {recipe.lastCookedAt && (
        <p>
          {strings.meals.lastCookedAt}{" "}
          <time dateTime={recipe.lastCookedAt}>
            {formatDate(recipe.lastCookedAt)}
          </time>
        </p>
      )}
      <p>
        {strings.detail.createdAt}{" "}
        <time dateTime={recipe.createdAt}>{formatDate(recipe.createdAt)}</time>
      </p>
      <h2>{strings.detail.ingredients}</h2>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <IngredientRow
            key={`${ingredient.name}-${index}`}
            ingredient={ingredient}
          />
        ))}
      </ul>
      {recipe.modifiedIngredients && (
        <h2>{strings.detail.modifiedIngredients}</h2>
      )}
      {recipe.modifiedIngredients.map((ingredient, index) => (
        <IngredientRow
          key={`${ingredient.name}-${index}`}
          ingredient={ingredient}
        />
      ))}
      {recipe.tags.length > 0 && (
        <ul>
          {recipe.tags.map((tag) => (
            <li key={tag}>#{tag}</li>
          ))}
        </ul>
      )}
    </main>
  );
}
