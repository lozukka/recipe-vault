function parseQuantity(input) {
  if (typeof input !== "string") return undefined;

  const trimmed = input.trim();
  if (trimmed === "") return null;

  // Only digits and at most one separator (comma or dot)
  if (!/^\d*[.,]?\d*$/.test(trimmed)) return undefined;

  // At least one digit, so "," and "." on their own are rejected
  if (!/\d/.test(trimmed)) return undefined;

  return Number(trimmed.replace(",", "."));
}

export default parseQuantity;
