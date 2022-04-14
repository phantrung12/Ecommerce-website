const express = require("express");
const {
  updateOrder,
  getCustomerOrders,
} = require("../../controllers/admin/orderCtrl.admin");
const {
  requireSignin,
  adminMiddleware,
} = require("../../middlewares/middleware");

const router = express.Router();

router.post(`/order/update`, requireSignin, adminMiddleware, updateOrder);
router.post(
  "/order/getCustomerOrders",
  requireSignin,
  adminMiddleware,
  getCustomerOrders
);

module.exports = router;
