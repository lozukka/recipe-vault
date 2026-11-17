import { isSafeURL } from "../utils/format";
import { strings } from "../strings";

export function RecipeSource({ recipe }) {
  const { sourceName, sourceURL } = recipe;
  const hasLink = sourceURL && isSafeURL(sourceURL);

  // TODO: follow the rules table:
  //  name + safe link   -> <a> with the name as text
  //  name only          -> plain text with the name
  //  safe link only     -> <a> with strings.detail.openSource
  //  neither            -> render nothing (return null)
  //
  // Links need: href={sourceURL} target="_blank" rel="noopener noreferrer"
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
