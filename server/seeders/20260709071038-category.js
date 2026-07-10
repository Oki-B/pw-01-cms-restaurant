"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let categoryData = require("../data/categories.json").map((el) => {
      el.created_at = el.updated_at = new Date();
      return el;
    });

    await queryInterface.bulkInsert("categories", categoryData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("categories", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
