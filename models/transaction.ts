"use strict";

import { UUIDV4, Model } from "sequelize";
import { ITransaction, transactionStatus } from "../src/types/transactionTypes";
module.exports = (sequelize: any, DataTypes: any) => {
  class Transaction extends Model<ITransaction> implements ITransaction {
    id?: undefined | string;
    user_offering_id!: string;
    user_offering_name!: string;
    user_demanding_id!: string;
    user_demanding_name!: string;
    status!: transactionStatus;
    pet_id!: string;
    pet_name!: string;
    pet_image: string | undefined;
    user_offering_check!: string | undefined;
    user_demanding_check!: string | undefined;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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
      user_offering_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_demanding_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_demanding_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: transactionStatus.Active,
        allowNull: false,
      },
      pet_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pet_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pet_image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      user_offering_check: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      user_demanding_check: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
