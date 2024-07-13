import { check } from "express-validator";

export const postOrderV = [
  check("price").isFloat().notEmpty().withMessage("Price needs to be a number"),
  check("userId").notEmpty().withMessage("User ID is required"),
];

export const putOrderV = [
  check("price").isFloat().optional().withMessage("Price needs to be a number"),
  check("date").isDate().optional().withMessage("Date needs to be a date"),
  check("userId").notEmpty().withMessage("User ID is required"),
];
