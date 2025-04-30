const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/orders");

// Create order
router.post("/", ordersController.createOrder);
// List orders
router.get("/", ordersController.listOrders);
// Get order details
router.get("/:id", ordersController.getOrder);
// Update order status
router.patch("/:id/status", ordersController.updateOrderStatus);
// Delete order
router.delete("/:id", ordersController.deleteOrder);

module.exports = router;
