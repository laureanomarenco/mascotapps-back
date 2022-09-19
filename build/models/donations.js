"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Donation extends sequelize_1.Model {
    }
    Donation.init({
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    }, {
        sequelize,
        modelName: "Donation",
    });
    return Donation;
};
