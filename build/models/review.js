"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// const User = require("./user");
exports.default = (sequelize, DataTypes) => {
    class Review extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.User.belongsToMany(models.User, {
                through: "Review",
                as: "reviewer",
                foreignKey: "reviewer_id",
            });
            models.User.belongsToMany(models.User, {
                through: "Review",
                as: "reviewed",
                foreignKey: "reviewed_id",
            });
        }
    }
    Review.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            defaultValue: sequelize_1.UUIDV4,
        },
        reviewer_id: {
            type: DataTypes.STRING,
            references: {
                model: "User",
                key: "id",
            },
        },
        reviewed_id: {
            type: DataTypes.STRING,
            references: {
                model: "User",
                key: "id",
            },
        },
        comments: {
            type: DataTypes.TEXT,
        },
        stars: {
            type: DataTypes.INTEGER,
        },
    }, {
        sequelize,
        modelName: "Review",
    });
    return Review;
};
