"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Bookings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      employeeId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Employees",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      driverId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Drivers",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      vehicleId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Vehicles",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      approverId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      bookingDate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      returnDate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Bookings");
  },
};
