const express = require("express");
const router = express.Router();

const bookingController = require("../controllers/bookingController");
const { adminAuth, approverAuth } = require("../middlewares/authorization");

router.post("/", adminAuth, bookingController.createBooking);
router.get("/", bookingController.getBookings);
router.put("/:id", approverAuth, bookingController.approveBookings);

module.exports = router;
