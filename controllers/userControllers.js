import User from "../models/userSchema.model.js";
import Order from "../models/orderSchema.modal.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const newUser = req.body;
    const updatedUser = await User.findByIdAndUpdate(req.params.id, newUser, {
      new: true,
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const userOrders = await Order.find({ userId: req.params.id }).populate(
      "userId"
    );
    res.status(200).json(userOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const checkActivity = async (req, res) => {
  try {
    const userOrders = await Order.find({ userId: req.params.id }).populate(
      "userId"
    );
    if (userOrders.length === 0) {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { active: false },
        { new: true }
      );
      res.status(200).json(user);
    } else {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { active: true },
        { new: true }
      );
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
