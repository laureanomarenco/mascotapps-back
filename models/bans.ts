"use strict";

import { UUIDV4, Model } from "sequelize";
import { IBan } from "../src/types/banTypes";
module.exports = (sequelize: any, DataTypes: any) => {
  class Ban extends Model<IBan> implements IBan {
    id!: string;
    email!: string;

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  }
  Ban.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Ban",
    }
  );
  return Ban;
};
