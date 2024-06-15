"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Driver extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Driver.hasMany(models.Booking, { foreignKey: "driverId" });
    }
  }
  Driver.init(
    {
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Parameter nama lengkap harus di isi" },
          notEmpty: { msg: "Parameter nama lengkap harus di isi" },
        },
      },
    },
    {
      sequelize,
      modelName: "Driver",
    }
  );
  return Driver;
};
