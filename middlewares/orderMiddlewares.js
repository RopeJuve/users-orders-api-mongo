import { validationResult } from "express-validator";
import Order from "../models/orderSchema.modal.js";

export const checkValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg });
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

export const checkBeforeCreateOrder = async (req, res, next) => {
  try {
    const { date } = req.body;
    const order = await Order.findOne({
      date: date,
    });
    if (order) {
      return res.status(400).json({ message: "Order already exists" });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const checkOrderExist = async (req, res, next) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    req.order = order;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
