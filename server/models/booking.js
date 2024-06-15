"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      // define association here
      Booking.belongsTo(models.Employee, { foreignKey: "employeeId" });
      Booking.belongsTo(models.Driver, { foreignKey: "driverId" });
      Booking.belongsTo(models.User, { foreignKey: "approverId" });
      Booking.belongsTo(models.Vehicle, { foreignKey: "vehicleId" });
    }
  }
  Booking.init(
    {
      employeeId: DataTypes.INTEGER,
      driverId: DataTypes.INTEGER,
      vehicleId: DataTypes.INTEGER,
      approverId: DataTypes.INTEGER,
      bookingDate: DataTypes.DATE,
      returnDate: DataTypes.DATE,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Booking",
    }
  );
  return Booking;
};
