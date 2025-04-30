const express = require("express");
const router = express.Router();
const carClassesController = require("../controllers/carClasses");

// Create car class
router.post("/", carClassesController.createCarClass);
// List car classes
router.get("/", carClassesController.listCarClasses);
// Get car class details
router.get("/:id", carClassesController.getCarClass);
// Update car class
router.put("/:id", carClassesController.updateCarClass);
// Delete car class
router.delete("/:id", carClassesController.deleteCarClass);

module.exports = router;
