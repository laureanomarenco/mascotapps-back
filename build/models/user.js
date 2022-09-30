"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// export interface UserAttributes {
//   id: string | undefined;
//   googleId: string | undefined;
//   displayName: string | undefined;
//   email: string | undefined;
//   name: string | undefined;
//   postalCode: string | undefined;
//   aditionalContactInfo: string | undefined;
//   thumbnail: string | undefined;
// }
module.exports = (sequelize, DataTypes) => {
    class User extends sequelize_1.Model {
        static associate(models) {
            // define association here
            User.hasMany(models.Animal);
            User.hasMany(models.Review);
            User.hasMany(models.Donation);
        }
    }
    User.init({
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false,
        },
        contact: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        isDonator: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        isAdopter: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        gaveUpForAdoption: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        foundAPet: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        gotAPetBack: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        points: {
            type: DataTypes.FLOAT,
            defaultValue: 0,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: "User",
    });
    return User;
};
