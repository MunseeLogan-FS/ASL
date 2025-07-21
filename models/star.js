"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Star extends Model {
    static associate(models) {
      models.Star.hasMany(models.Planet, { foreignKey: "starId" });
      models.Star.belongsTo(models.Galaxy, { foreignKey: "galaxyId" });
    }
  }

  Star.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      size: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      galaxyId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Star",
    }
  );

  return Star;
};
