"use strict";

import { UUIDV4 } from "sequelize";
import { IImage } from "../src/types/imageTypes";

const { Model } = require("sequelize");
module.exports = (sequelize: any, DataTypes: any) => {
  class Image extends Model<IImage> implements IImage {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
      Image.belongsTo(models.Comment);
    }
  }
  Image.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: true,
        defaultValue: UUIDV4,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      alt: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Image",
    }
  );
  return Image;
};
