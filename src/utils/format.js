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
