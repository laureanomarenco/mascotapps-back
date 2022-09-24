"use strict";

import { UUIDV4 } from "sequelize";

const { Model } = require("sequelize");
module.exports = (sequelize: any, DataTypes: any) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
    }
  }
  Transaction.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: UUIDV4,
      },
      user_offering_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_demanding_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pet_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_offering_check: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_demanding_check: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
