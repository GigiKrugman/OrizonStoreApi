const Customer = require("../models/Customer");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../Error/customError");

const getAllCustomers = asyncWrapper(async (req, res) => {
  const customer = await Customer.find(req.body);
  res.status(201).json({ customer });
});

const createCustomer = asyncWrapper(async (req, res) => {
  const customer = await Customer.create(req.body);
  res.status(200).json({ customer });
});

const getCustomer = asyncWrapper(async (req, res, next) => {
  const { id: customerID } = req.params;
  const customer = await Customer.findOne({ _id: customerID });
  if (!customer) {
    return next(createCustomError(`No task with id: ${customerID}`, 404));
  }
  res.status(200).json({ customer });
});

const updateCustomer = asyncWrapper(async (req, res, next) => {
  const { id: customerID } = req.params;
  const customer = await Customer.findOneAndUpdate(
    { _id: customerID },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!customer) {
    return next(createCustomError(`No task with id: ${customerID}`, 404));
  }
  res.status(200).json({ customer });
});

const deleteCustomer = asyncWrapper(async (req, res, body) => {
  const { id: customerID } = req.params;
  const customer = await Customer.findByIdAndDelete({ _id: customerID });

  if (!customer) {
    return next(createCustomError(`No task with id: ${customerID}`, 404));
  }
  res.status(200).json({ customer });
});

module.exports = {
  getAllCustomers,
  createCustomer,
  getCustomer,
  updateCustomer,
  deleteCustomer,
};
