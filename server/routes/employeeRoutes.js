const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");

router.get("/", employeeController.getEmployes);
router.get("/approvers", employeeController.getApprovers);

module.exports = router;
