const { User, Diver, Employee, Vehicle, Booking } = require("../models");
const { sequelize } = require("../models");

class bookingController {
  static async createBooking(req, res, next) {
    try {
      const {
        employeeId,
        driverId,
        vehicleId,
        approverId,
        bookingDate,
        returnDate,
      } = req.body;

      if (req.user.role === "admin") {
        const booking = await Booking.create({
          employeeId,
          driverId,
          vehicleId,
          approverId,
          bookingDate,
          returnDate,
          status: "Pending",
        });

        res.status(201).json({
          message: "Pemesanan kendaraan berhasil, menunggu persetujuan atasan",
        });
      } else {
        throw { name: "Forbiden" };
      }
    } catch (error) {
      next(error);
    }
  }

  static async getBookings(req, res, next) {
    try {
      const result = await Booking.findAll();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async approveBookings(req, res, next) {
    try {
      const { id } = req.params;
      const booking = await Booking.findByPk(id);
      if (booking) {
        booking.status = "Approved";
        await booking.save();
        res.status(200).json({
          message: "Pemesanan kendaraan disetujui",
        });
      } else {
        res.status(404).json({ error: "Booking not found" });
      }
    } catch (error) {
      next(error);
    }
  }
  // end booking controller
}

module.exports = bookingController;
