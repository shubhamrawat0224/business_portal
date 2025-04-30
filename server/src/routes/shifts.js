const express = require("express");
const router = express.Router();
const shiftsController = require("../controllers/shifts");

// Start a shift
router.post("/", shiftsController.startShift);
// End a shift
router.patch("/:id/end", shiftsController.endShift);
// List shifts
router.get("/", shiftsController.listShifts);
// Get shift details
router.get("/:id", shiftsController.getShift);
// Delete shift
router.delete("/:id", shiftsController.deleteShift);

module.exports = router;
