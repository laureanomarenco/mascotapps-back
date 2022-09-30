"use strict";

import { MultiplierType } from "../src/types/multiplierTypes";
const { Model } = require("sequelize");

module.exports = (sequelize: any, DataTypes: any) => {
  class Multiplier extends Model<MultiplierType> implements MultiplierType {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    number!: number; // sub
  }
  Multiplier.init(
    {
      id: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        primaryKey: true,
      },
      number: {
        type: DataTypes.FLOAT,
        defaultValue: 1,
      },
    },
    {
      sequelize,
      modelName: "Multiplier",
    }
  );
  return Multiplier;
};
