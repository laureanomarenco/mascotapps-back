"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const transactionTypes_1 = require("../src/types/transactionTypes");
module.exports = (sequelize, DataTypes) => {
    class Transaction extends sequelize_1.Model {
    }
    Transaction.init({
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            defaultValue: sequelize_1.UUIDV4,
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
            defaultValue: transactionTypes_1.transactionStatus.Active,
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
    }, {
        sequelize,
        modelName: "Transaction",
    });
    return Transaction;
};
