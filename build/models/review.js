"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize, DataTypes) => {
    class Review extends sequelize_1.Model {
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
            type: DataTypes.INTEGER,
            primaryKey: true,
            defaultValue: sequelize_1.UUIDV4,
        },
        reviewer_id: {
            type: DataTypes.STRING,
        },
        reviewed_id: {
            type: DataTypes.STRING,
        },
        comments: {
            type: DataTypes.STRING,
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
