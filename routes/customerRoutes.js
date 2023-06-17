const express = require("express");
const router = express.Router();

const {
  getAllCustomers,
  createCustomer,
  getCustomer,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customerController");

router.route("/").get(getAllCustomers).post(createCustomer);
router
  .route("/:id")
  .get(getCustomer)
  .patch(updateCustomer)
  .delete(deleteCustomer);

module.exports = router;
