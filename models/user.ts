"use strict";

import { Model, UUIDV4 } from "sequelize";
import { UserAttributes } from "../src/types/userTypes";

// export interface UserAttributes {
//   id: string | undefined;
//   googleId: string | undefined;
//   displayName: string | undefined;
//   email: string | undefined;
//   name: string | undefined;
//   postalCode: string | undefined;
//   aditionalContactInfo: string | undefined;
//   thumbnail: string | undefined;
// }

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: string; // sub
    email!: string;
    name: string | undefined;
    city: string | undefined;
    contact: string | undefined;
    image: string | undefined;
    static associate(models: any) {
      // define association here
      User.hasMany(models.Animal);
      User.belongsToMany(User, { through: "Transaction" });
      User.belongsToMany(User, { through: "Transaction" });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
      },
      contact: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
      },
      image: {
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
