export const formatQuantity = (quantity) => {
  if (quantity === null) return "";

  const quantityString = quantity.toString();
  const formattedQuantity = quantityString.replace(".", ",");

  return formattedQuantity;
};

export const formatIngredient = ({ quantity, unit, name, note }) => {
  const line = [formatQuantity(quantity), unit, name].filter(Boolean).join(" ");

  return note ? `${line} (${note})` : line;
};

export const isSafeURL = (input) => {
  if (typeof input !== "string") return false;

  try {
    const { protocol } = new URL(input);
    return protocol === "http:" || protocol === "https:";
  } catch {
    return false;
  }
};

export const formatDate = (isoString) => {
  if (!isoString) return "";

  const date = new Date(isoString);
  return Number.isNaN(date.getTime()) ? "" : date.toLocaleDateString("fi-Fi");
};
