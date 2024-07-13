import { Schema, model } from "mongoose";

const orderSchema = new Schema({
  price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default:  Date.now,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Order = model("Order", orderSchema);

export default Order;
