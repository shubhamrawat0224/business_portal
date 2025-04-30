const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const productsController = require("../controllers/products");
const authMiddleware = require("../middleware/auth");

// Validation middleware
const validateProduct = [
  body("name").notEmpty().trim(),
  body("description").notEmpty().trim(),
  body("price").isFloat({ min: 0 }),
  body("stock").isInt({ min: 0 }),
];

// Routes
router.get("/", productsController.getAllProducts);
router.get("/:id", productsController.getProductById);
router.post(
  "/",
  authMiddleware,
  validateProduct,
  productsController.createProduct
);
router.put(
  "/:id",
  authMiddleware,
  validateProduct,
  productsController.updateProduct
);
router.delete("/:id", authMiddleware, productsController.deleteProduct);

module.exports = router;
