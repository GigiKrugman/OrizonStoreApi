const Product = require("../models/Product");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../Error/customError");

const getAllProducts = asyncWrapper(async (req, res) => {
  const product = await Product.find(req.body);
  res.status(201).json({ product });
});

const createProduct = asyncWrapper(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(200).json({ product });
});

const getProduct = asyncWrapper(async (req, res, next) => {
  const { id: productID } = req.params;
  const product = await Product.findOne({ _id: productID });
  if (!product) {
    return next(createCustomError(`No task with id: ${productID}`, 404));
  }
  res.status(200).json({ product });
});

const updateProduct = asyncWrapper(async (req, res, next) => {
  const { id: productID } = req.params;
  const product = await Product.findOneAndUpdate({ _id: productID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return next(createCustomError(`No task with id: ${productID}`, 404));
  }
  res.status(200).json({ product });
});

const deleteProduct = asyncWrapper(async (req, res, body) => {
  const { id: productID } = req.params;
  const product = await Product.findByIdAndDelete({ _id: productId });

  if (!product) {
    return next(createCustomError(`No task with id: ${productID}`, 404));
  }
  res.status(200).json({ product });
});

module.exports = {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
