"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Multiplier extends Model {
    }
    Multiplier.init({
        id: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            primaryKey: true,
        },
        number: {
            type: DataTypes.FLOAT,
            defaultValue: 1,
        },
    }, {
        sequelize,
        modelName: "Multiplier",
    });
    return Multiplier;
};
