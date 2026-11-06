export const formatQuantity = (quantity) => {
  if (quantity === null) return "";

  const quantityString = quantity.toString();
  const formattedQuantity = quantityString.replace(".", ",");

  return formattedQuantity;
};
