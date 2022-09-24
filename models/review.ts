"use strict";

import { Model } from "sequelize";
import { UUIDV4 } from "sequelize";
import { IReview } from "../src/types/reviewTypes";

module.exports = (sequelize: any, DataTypes: any) => {
  class Review extends Model<IReview> implements IReview {
    id: undefined;
    transaction_id!: string;
    reviewer_id!: string;
    comments: string | undefined;
    stars!: number;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      Review.belongsTo(models.User)
    }
  }
  Review.init(
    {
      id: {
        type: DataTypes.STRING,
        defaultValue: UUIDV4,
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
    },
    {
      sequelize,
      modelName: "Review",
    }
  );
  return Review;
};
