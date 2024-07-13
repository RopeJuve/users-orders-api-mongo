import { validationResult } from "express-validator";
import User from "../models/userSchema.model.js";
import mongoose from "mongoose";

export const checkValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }
  next();
};
export const modifyBody = (req, res, next) => {
  const { first_name, last_name, email } = req.body;
  if (first_name && last_name) {
    req.body.first_name =
      first_name.charAt(0).toUpperCase() + first_name.slice(1).toLowerCase();
    req.body.last_name =
      last_name.charAt(0).toUpperCase() + last_name.slice(1).toLowerCase();
  }

  if (email) {
    req.body.email = email.toLowerCase();
  }

  next();
};

export const checkId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`The id ${id} is not valid`);
  }
  next();
};

export const checkUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const checkBeforeCreate = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({
      email: email,
    });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
