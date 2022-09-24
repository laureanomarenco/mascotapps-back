"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Review extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Review.init({
        id: {
            type: DataTypes.STRING,
            defaultValue: sequelize_1.UUIDV4,
            primaryKey: true,
        },
        transaction_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        reviewer_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        reviewed_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        comments: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        stars: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: "Review",
    });
    return Review;
};
