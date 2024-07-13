import express from "express";
import {
  createOrder,
  deleteOrder,
  getOrder,
  getOrders,
  updateOrder,
} from "../controllers/orderControllers.js";
import { postOrderV, putOrderV } from "../validators/orderValidators.js";
import {
  checkId,
  checkOrderExist,
  checkValidation,
  checkBeforeCreateOrder,
} from "../middlewares/orderMiddlewares.js";

const orderRouter = express.Router();

orderRouter.get("/", getOrders);
orderRouter.get("/:id", checkId, checkOrderExist, getOrder);
orderRouter.post(
  "/",
  postOrderV,
  checkValidation,
  checkBeforeCreateOrder,
  createOrder
);
orderRouter.put(
  "/:id",
  putOrderV,
  checkValidation,
  checkOrderExist,
  updateOrder
);
orderRouter.delete("/:id", checkId, checkOrderExist, deleteOrder);

export default orderRouter;
