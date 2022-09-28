"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Model } = require("sequelize");
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Comment.belongsTo(models.Animal);
            Comment.hasMany(models.Image);
        }
    }
    Comment.init({
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            defaultValue: sequelize_1.UUIDV4,
            allowNull: true,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "Usuario Anónimo",
        },
        provincia: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        localidad: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lugar: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fecha: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        condicion: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        comentarios: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        hora: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        sequelize,
        modelName: "Comment",
    });
    return Comment;
};
