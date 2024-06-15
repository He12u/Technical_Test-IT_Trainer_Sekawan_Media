"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Vehicle extends Model {
    static associate(models) {
      Vehicle.hasMany(models.Booking, { foreignKey: "vehicleId" });
    }
  }
  Vehicle.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Parameter nama kendaraan harus di isi" },
          notEmpty: { msg: "Parameter nama kendaraan harus di isi" },
        },
      },
      numberPlate: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Parameter nomor plat kendaraan harus di isi" },
          notEmpty: { msg: "Parameter nomor plat kendaraan harus di isi" },
        },
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Parameter type harus di isi" },
          notEmpty: { msg: "Parameter type harus di isi" },
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Parameter status harus di isi" },
          notEmpty: { msg: "Parameter status harus di isi" },
        },
      },
      fuelConsumption: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Parameter konsumsi BBM harus di isi" },
          notEmpty: { msg: "Parameter konsumsi BBM harus di isi" },
          isInt: {
            msg: "Parameter harus berupa angka",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Vehicle",
    }
  );
  return Vehicle;
};
