import { strings } from "../strings";
import { IngredientRow } from "../components/IngredientRow";

function RecipeDetailPage(recipe) {
  return (
    <>
      <main>
        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <IngredientRow
              key={`${ingredient.name}-${index}`}
              ingredient={ingredient}
            />
          ))}
        </ul>
      </main>
    </>
  );
}

export default RecipeDetailPage;
