"use strict";

const { hashPassword } = require("../utils/bcrypt.util");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let userData = [
      {
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        name: process.env.ADMIN_NAME,
        role: "admin",
      },
      {
        email: process.env.STAFF_1_EMAIL,
        password: process.env.STAFF_1_PASSWORD,
        name: process.env.STAFF_1_NAME,
        role: "staff",
      },
      {
        email: process.env.STAFF_2_EMAIL,
        password: process.env.STAFF_2_PASSWORD,
        name: process.env.STAFF_2_NAME,
        role: "staff",
      },
    ].map((el) => {
      el.created_at = el.updated_at = new Date();
      el.password = hashPassword(el.password);
      return el;
    });

    await queryInterface.bulkInsert("users", userData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
