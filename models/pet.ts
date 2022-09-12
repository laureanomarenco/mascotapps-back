"use strict";

import { Model, UUIDV4 } from "sequelize";
import { Pet } from "../src/types/petTypes";

//------ Types e interfaces para modelo Pet : ------

interface MascotaAttributes {
  id: typeof UUIDV4;
}

//--------- fin types e interfaces para modelo Pet --------
interface PetAttributes {
  id: string;
  name: string | undefined;
  race: string;
  status: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Pet extends Model<PetAttributes> implements PetAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: string;
    name: string | undefined;
    race!: string;
    status!: string;
    static associate(models: any) {
      // define association here
      Pet.belongsTo(models.User);
    }
  }
  Pet.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      race: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Pet",
    }
  );
  return Pet;
};
