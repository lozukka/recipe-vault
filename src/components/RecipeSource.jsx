import { isSafeURL } from "../utils/format";
import { strings } from "../strings";

export function RecipeSource({ recipe }) {
  const { sourceName, sourceURL } = recipe;
  const hasLink = sourceURL && isSafeURL(sourceURL);

  if (hasLink)
    return (
      <a href={sourceURL} target="_blank" rel="noopener noreferrer">
        {sourceName}
      </a>
    );

  if (sourceName) return <p>{sourceName}</p>;

  if (sourceURL)
    return (
      <a href={sourceURL} target="_blank" rel="noopener noreferrer">
        {strings.detail.openSource}
      </a>
    );

  return null;
}
