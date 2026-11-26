import { isSafeURL } from "./format";
import parseQuantity from "./parseQuantity";
import { UNITS } from "../constants";

const isBlank = (text) => text.trim() === "";

const isValidMeals = (text) => /^\d+$/.test(text) && Number(text) >= 1;

const hasKeys = (object) => Object.keys(object).length > 0;

const isRowEmpty = (row) =>
  [row.quantity, row.unit, row.name, row.note ?? ""].every(isBlank);

const validateRow = (row) => {
  const errors = {};

  if (isBlank(row.name)) {
    errors.name = "required";
  }
  if (parseQuantity(row.quantity) === undefined) {
    errors.quantity = "invalid";
  }
  if (!isBlank(row.unit) && !UNITS.includes(row.unit)) {
    errors.unit = "invalid";
  }
  return errors;
};

const validateRows = (rows) => {
  const errors = {};
  rows.forEach((row) => {
    if (isRowEmpty(row)) return;
    const rowErrors = validateRow(row);
    if (hasKeys(rowErrors)) {
      errors[row.rowId] = rowErrors;
    }
  });
  return errors;
};

export const validateDraft = (draft) => {
  const errors = {};

  if (isBlank(draft.title)) {
    errors.title = "required";
  }
  if (!isBlank(draft.mealsQty) && !isValidMeals(draft.mealsQty.trim())) {
    errors.mealsQty = "invalid";
  }
  if (!isBlank(draft.sourceURL) && !isSafeURL(draft.sourceURL)) {
    errors.sourceURL = "invalid";
  }

  const ingredientErrors = validateRows(draft.ingredients);
  if (hasKeys(ingredientErrors)) {
    errors.ingredients = ingredientErrors;
  }

  const modifiedIngredientsErrors = validateRows(draft.modifiedIngredients);
  if (hasKeys(modifiedIngredientsErrors)) {
    errors.modifiedIngredients = modifiedIngredientsErrors;
  }

  return errors;
};
