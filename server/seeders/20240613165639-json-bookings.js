"use strict";

const fs = require("fs").promises;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let data = JSON.parse(await fs.readFile("./data/booking.json", "utf-8"));
    data.map((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
      return el;
    });
    await queryInterface.bulkInsert("Bookings", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Bookings", null);
  },
};
