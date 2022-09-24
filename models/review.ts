"use strict";
import { Model, STRING, UUIDV4 } from "sequelize";
import models from ".";
export default (sequelize: any, DataTypes: any) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
    }
  }
  Review.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        defaultValue: UUIDV4,
      },
      reviewer_id: {
        type: DataTypes.STRING,
        references: {
          model: models.User, // 'Movies' would also work
          key: "id",
        },
      },
      reviewed_id: {
        type: DataTypes.STRING,
        references: {
          model: models.User, // 'Actors' would also work
          key: "id",
        },
      },
      comments: {
        type: DataTypes.TEXT,
        references: {
          model: models.User,
          key: "id",
        },
      },
      stars: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Review",
    }
  );
  return Review;
};
