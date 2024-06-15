"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    static associate(models) {
      // define association here
      Employee.hasMany(models.Booking, { foreignKey: "employeeId" });
    }
  }
  Employee.init(
    {
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Parameter nama lengkap harus di isi" },
          notEmpty: { msg: "Parameter nama lengkap harus di isi" },
        },
      },
      department: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Parameter department harus di isi" },
          notEmpty: { msg: "Parameter department harus di isi" },
        },
      },
    },
    {
      sequelize,
      modelName: "Employee",
    }
  );
  return Employee;
};
