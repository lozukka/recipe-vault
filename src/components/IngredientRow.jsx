import { formatIngredient } from "../utils/format";

export function IngredientRow({ ingredient }) {
  return (
    <>
      <li>{formatIngredient(ingredient)}</li>
    </>
  );
}
