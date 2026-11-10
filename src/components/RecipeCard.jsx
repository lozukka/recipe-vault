import { Link } from "react-router";
import { strings } from "../strings";

export function RecipeCard({ recipe }) {
  return (
    <Link to={`/recipes/${recipe.id}`}>
      <h2>{recipe.title}</h2>
      {/* TODO 1: the meals text, from strings.meals(recipe.mealsQty) */}
      {/* TODO 2: the tags, each shown with a # in front.
                  Render nothing at all if there are no tags. */}
    </Link>
  );
}
