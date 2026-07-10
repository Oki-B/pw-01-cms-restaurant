"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let cuisineData = require("../data/cuisinies.json").map((el) => {
      el.created_at = el.updated_at = new Date();
      return el;
    });

    await queryInterface.bulkInsert("cuisines", cuisineData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("cuisines", null, {});
  },
};
