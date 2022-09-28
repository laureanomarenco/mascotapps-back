"use strict";
const { Model } = require("sequelize");
import { UUIDV4 } from "sequelize";
import { IComment } from "../src/types/commentTypes";
module.exports = (sequelize: any, DataTypes: { STRING: any; ARRAY: any }) => {
  class Comment extends Model<IComment> implements IComment {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
      Comment.belongsTo(models.Animal);
      Comment.hasMany(models.Image);
    }
  }
  Comment.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: UUIDV4,
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
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
