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
        }
    }
    User.init({
        id: {
            type: DataTypes.STRING,
            defaultValue: sequelize_1.UUIDV4,
            primaryKey: true,
            // allowNull: true,
        },
        displayName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false,
        },
        postalCode: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        aditionalContactInfo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        thumbnail: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        sequelize,
        modelName: "User",
    });
    return User;
};
