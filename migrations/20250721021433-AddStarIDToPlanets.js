"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("planets", "starId", {
      type: Sequelize.INTEGER,
      references: {
        model: "stars",
        key: "id",
      },
      allowNull: true,
    });

    await queryInterface.addColumn("stars", "galaxyId", {
      type: Sequelize.INTEGER,
      references: {
        model: "galaxies",
        key: "id",
      },
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("planets", "starId");
    await queryInterface.removeColumn("stars", "galaxyId");
  },
};
