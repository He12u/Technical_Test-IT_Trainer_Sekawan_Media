const { Driver } = require("../models");

class driverController {
  static async getDrivers(req, res, next) {
    try {
      const drivers = await Driver.findAll();
      res.status(200).json(drivers);
    } catch (error) {
      next(error);
    }
  }
  // end driver controller
}

module.exports = driverController;
