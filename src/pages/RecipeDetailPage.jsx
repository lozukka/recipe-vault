import { Link, useParams } from "react-router";
import { useRecipes } from "../hooks/useRecipes";
import { IngredientRow } from "../components/IngredientRow";
import { strings } from "../strings";

export default function RecipeDetailPage() {
  const { id } = useParams();
  const { recipes } = useRecipes();

  const recipe = undefined;

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
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <IngredientRow
            key={`${ingredient.name}-${index}`}
            ingredient={ingredient}
          />
        ))}
      </ul>
    </main>
  );
}
