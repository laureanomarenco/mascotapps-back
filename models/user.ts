"use strict";

import { Model, UUIDV4 } from "sequelize";

interface UserAttributes {
  id: string | undefined;
  googleId: string | undefined;
  displayName: string | undefined;
  name: string | undefined;
  email: string | undefined;
  city: string | undefined;
  contact: string | undefined;
  thumbnail: string | undefined;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id: string | undefined;
    googleId: string | undefined;
    displayName: string | undefined;
    name: string | undefined;
    email: string | undefined;
    city: string | undefined;
    contact: string | undefined;
    image: string | undefined;
    thumbnail: string | undefined;
    static associate(models: any) {
      // define association here
      User.hasMany(models.Animal);
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.STRING,
        defaultValue: UUIDV4,
        primaryKey: true,
        // allowNull: true,
      },
      googleId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      displayName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      contact: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      thumbnail: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
