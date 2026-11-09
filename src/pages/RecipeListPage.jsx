import { strings } from "../strings";

export function RecipeListPage() {
  return (
    <>
      <h1>{strings.list.title}</h1>
      <div>{strings.list.empty}</div>
    </>
  );
}
