"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize: any, DataTypes: any) => {
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
      review_id: DataTypes.STRING,
      transaction_id: DataTypes.STRING,
      reviewer_id: DataTypes.STRING,
      reviewed_id: DataTypes.STRING,
      comments: DataTypes.STRING,
      stars: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Review",
    }
  );
  return Review;
};
