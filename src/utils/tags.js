const removeHashtags = (tag) => tag.replace(/^#+/, "");
const toLowercase = (tag) => tag.toLocaleLowerCase("fi");

export const normalizeTags = (input) => {
  if (typeof input !== "string") return [];

  const tags = input
    .split(/[\s,]+/)
    .map(removeHashtags)
    .map(toLowercase)
    .filter(Boolean);

  return [...new Set(tags)];
};
