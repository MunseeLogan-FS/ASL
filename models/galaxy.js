"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Galaxy extends Model {
    static associate(models) {
      // A Galaxy has many Stars
      models.Galaxy.hasMany(models.Star, { foreignKey: "galaxyId" });
    }
  }

  Galaxy.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      size: DataTypes.INTEGER,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Galaxy",
    }
  );

  return Galaxy;
};
