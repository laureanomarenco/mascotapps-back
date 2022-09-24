"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Review extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Review.belongsTo(models.User);
        }
    }
    Review.init({
        id: {
            type: DataTypes.STRING,
            defaultValue: sequelize_2.UUIDV4,
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
        comments: {
            type: DataTypes.TEXT,
            allowNull: true,
            validate: {
                len: {
                    args: [0, 1000],
                    msg: "SQLZ Error. El largo del comentario debe ser menor a 1000 caracteres",
                },
            },
        },
        stars: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5,
            },
        },
    }, {
        sequelize,
        modelName: "Review",
    });
    return Review;
};
