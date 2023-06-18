const Order = require("../models/Order");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../Error/customError");

const getAllOrders = asyncWrapper(async (req, res) => {
  const orders = await Order.find(req.body)
    .populate("products")
    .populate("customers");
  res.status(201).json({ orders });
});

const createOrder = asyncWrapper(async (req, res) => {
  const order = await Order.create(req.body);
  res.status(200).json({ order });
});

const getOrder = asyncWrapper(async (req, res, next) => {
  const { id: orderID } = req.params;
  const order = await Order.findOne({ _id: orderID })
    .populate("products")
    .populate("customers");
  if (!order) {
    return next(createCustomError(`No task with id: ${orderID}`, 404));
  }
  res.status(200).json({ order });
});

const updateOrder = asyncWrapper(async (req, res, next) => {
  const { id: orderID } = req.params;
  const order = await Order.findOneAndUpdate({ _id: orderID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!order) {
    return next(createCustomError(`No task with id: ${orderID}`, 404));
  }
  res.status(200).json({ order });
});

const deleteOrder = asyncWrapper(async (req, res, body) => {
  const { id: orderID } = req.params;
  const order = await Order.findByIdAndDelete({ _id: orderID });

  if (!order) {
    return next(createCustomError(`No task with id: ${orderID}`, 404));
  }
  res.status(200).json({ order });
});

module.exports = {
  getAllOrders,
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
};
