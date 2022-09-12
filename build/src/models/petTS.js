"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class PetTS extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            PetTS.belongsTo(models.User);
        }
    }
    PetTS.init({
        id: {
            type: DataTypes.STRING,
            defaultValue: sequelize_1.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        specie: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        race: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        age: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        vaccinationSchemeStatus: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        comments: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        sequelize,
        modelName: "PetTS",
    });
    return PetTS;
};
