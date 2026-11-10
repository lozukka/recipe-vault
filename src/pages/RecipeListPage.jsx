import { useRecipes } from "../hooks/useRecipes";
import { RecipeCard } from "../components/RecipeCard";
import { strings } from "../strings";

export function RecipeListPage() {
  const { recipes } = useRecipes();

  return (
    <>
      <main>
        <h1>{strings.list.title}</h1>

        {/* TODO 3: no recipes -> <p> with strings.list.empty.
                  otherwise -> a <ul> with one <li key=...> per recipe,
                  containing a RecipeCard. */}
      </main>
    </>
  );
}
