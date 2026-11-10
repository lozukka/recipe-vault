import { Link } from "react-router";
import { strings } from "../strings";
import { formatDate } from "../utils/format";

export function RecipeCard({ recipe }) {
  return (
    <Link to={`/recipes/${recipe.id}`}>
      <h2>{recipe.title}</h2>
      <div>
        <p>
          {strings.meals.mealsQuantity} {recipe.mealsQty}
        </p>
        {recipe.lastCookedAt && (
          <span>
            {strings.meals.lastCookedAt}{" "}
            <time dateTime={recipe.lastCookedAt}>
              {formatDate(recipe.lastCookedAt)}
            </time>
          </span>
        )}
      </div>
      {recipe.tags.length > 0 && (
        <ul>
          {recipe.tags.map((tag) => (
            <li key={tag}>#{tag}</li>
          ))}
        </ul>
      )}
    </Link>
  );
}
