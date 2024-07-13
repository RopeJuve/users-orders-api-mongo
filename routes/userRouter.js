import express from "express";
import {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getUserOrders,
  checkActivity
} from "../controllers/userControllers.js";
import {
  checkId,
  checkUser,
  modifyBody,
  checkValidation,
  checkBeforeCreate,
} from "../middlewares/userMiddlewares.js";

import { postBodyV, putBodyV } from "../validators/userValidators.js";

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", checkId, checkUser, getUser);
userRouter.get(
  "/:id/orders",
  checkId,
  checkValidation,
  checkUser,
  getUserOrders
);
userRouter.post(
  "/",
  postBodyV,
  checkValidation,
  modifyBody,
  checkBeforeCreate,
  createUser
);
userRouter.put("/:id", putBodyV, checkValidation, checkUser, updateUser);
userRouter.put(
    "/:id/check-inactive",
    checkId,
    checkValidation,
    checkUser,
    checkActivity
  );
userRouter.delete("/:id", checkId, checkUser, deleteUser);

export default userRouter;
