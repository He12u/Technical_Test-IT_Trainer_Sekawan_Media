const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const bookingRoutes = require("./bookingRoutes");
const vehicleRoutes = require("./vehicleRoutes");
const employeeRoutes = require("./employeeRoutes");
const driverRoutes = require("./driverRoutes");

const errorHandler = require("../middlewares/errorHandler");
const authentication = require("../middlewares/authentication");
// const authentication = require("../middlewares/authentication");

// API Registration (Public)
router.use("/login", authRoutes);

// API Registration (Private)
router.use(authentication);
router.use("/bookings", bookingRoutes);
router.use("/vehicles", vehicleRoutes);
router.use("/employees", employeeRoutes);
router.use("/drivers", driverRoutes);

router.use(errorHandler);

module.exports = router;
