"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.hasMany(models.Booking, { foreignKey: "approverId" });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Parameter username harus di isi" },
          notEmpty: { msg: "Parameter username harus di isi" },
        },
        unique: {
          args: true,
          msg: "username sudah terdaftar",
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Parameter password harus di isi" },
          notEmpty: { msg: "Parameter password harus di isi" },
          len: {
            args: [8, Infinity],
            msg: "Password length minimal 8 karakter",
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Parameter role harus di isi" },
          notEmpty: { msg: "Parameter role harus di isi" },
          isIn: {
            args: [["admin", "approver"]],
            msg: "Must be admin or approver",
          },
        },
      },
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
      modelName: "User",
    }
  );
  //add hooks
  User.beforeCreate((user) => {
    user.password = hashPassword(user.password);
  });
  return User;
};
