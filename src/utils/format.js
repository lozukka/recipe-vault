export const formatQuantity = (quantity) => {
  if (quantity === null) return "";
  const quantityString = quantity.toString();
  String(quantityString).replace(".", ",");
  console.log(quantityString);
  return quantityString;
};
