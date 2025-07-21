"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Planet extends Model {
    static associate(models) {
      // Each planet belongs to one star
      models.Planet.belongsTo(models.Star, { foreignKey: "starId" });
    }
  }

  Planet.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      size: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      starId: DataTypes.INTEGER, // foreign key to Star
    },
    {
      sequelize,
      modelName: "Planet",
    }
  );

  return Planet;
};
