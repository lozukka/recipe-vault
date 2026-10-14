function parseQuantity(input) {
  if (typeof input !== "string") return undefined;

  const trimmed = input.trim();
  if (trimmed === "") return null;

  const pattern = /\d[.,]?\d/g; // your job: what does a valid quantity look like?
  if (!pattern.test(trimmed)) return undefined;

  return Number(trimmed.replace(",", "."));
}

export default parseQuantity;

//
// \d[.,]? [.,]|
//[^a-zA-Z]+
