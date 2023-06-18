const Order = require("../models/Order");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../Error/customError");

const sortOrders = async (req) => {
  let query = Order.find().populate("products").populate("customers");

  // Check if 'date' was a field for filtering
  if (req.query.date) {
    const date = new Date(req.query.date);
    query = query.find({
      date: { $gte: date, $lt: new Date(date).setDate(date.getDate() + 1) },
    });
  }

  // Check if 'products' was a field for filtering
  if (req.query.products) {
    const productIds = req.query.products.split(",");
    query = query.find({ products: { $in: productIds } });
  }

  // Executing query
  const orders = await query;

  return orders;
};

const getAllOrders = asyncWrapper(async (req, res) => {
  const orders = await sortOrders(req);

  res.status(200).json({ orders });
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
