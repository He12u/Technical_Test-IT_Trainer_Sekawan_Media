const { Vehicle } = require("../models");

class vehicleController {
  static async getVehicles(req, res, next) {
    try {
      const vehicles = await Vehicle.findAll();
      res.status(200).json(vehicles);
    } catch (error) {
      next(error);
    }
  }

  static async addVehicle(req, res, next) {
    try {
      const { name, numberPlate, type, status, fuelConsumption } = req.body;
      const vehicle = await Vehicle.create({
        name,
        numberPlate,
        type,
        status,
        fuelConsumption,
      });
      res.json(vehicle);
    } catch (error) {
      next(error);
    }
  }
  // end vehicle controller
}

module.exports = vehicleController;
