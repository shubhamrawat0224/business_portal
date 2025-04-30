const express = require("express");
const router = express.Router();
const branchesController = require("../controllers/branches");

// Create branch
router.post("/", branchesController.createBranch);
// List branches
router.get("/", branchesController.listBranches);
// Get branch details
router.get("/:id", branchesController.getBranch);
// Update branch
router.put("/:id", branchesController.updateBranch);
// Delete branch
router.delete("/:id", branchesController.deleteBranch);

module.exports = router;
