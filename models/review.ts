"use strict";
import { Model, STRING, UUIDV4 } from "sequelize";

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
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: UUIDV4,
      },
      transaction_id: {
        type: DataTypes.STRING,
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
    },
    {
      sequelize,
      modelName: "Review",
    }
  );
  return Review;
};
