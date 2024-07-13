import { check } from "express-validator";

export const postBodyV = [
  check("first_name")
    .isString()
    .notEmpty()
    .withMessage("Name needs to be a string"),
  check("last_name")
    .isString()
    .notEmpty()
    .withMessage("Last name needs to be a string"),
  check("email")
    .isEmail()
    .withMessage("Not a valid email address")
    .notEmpty()
    .withMessage("Not a valid email address"),
  check("active")
    .isBoolean()
    .optional()
    .withMessage("Active needs to be a boolean"),
];

export const putBodyV = [
  check("first_name")
    .isString()
    .optional()
    .withMessage("Name needs to be a string"),
  check("last_name")
    .isString()
    .optional()
    .withMessage("Last name needs to be a string"),
  check("email").isEmail().optional().withMessage("Not a valid email address"),
  check("active")
    .isBoolean()
    .optional()
    .withMessage("Active needs to be a boolean"),
];
