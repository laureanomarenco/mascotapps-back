"use strict";
import { Model, UUIDV4 } from "sequelize";
import {
  Ages,
  Genders,
  Pet,
  Species,
  Status,
  VaccinationStatus,
} from "../types/petTypes";

module.exports = (sequelize: any, DataTypes: { STRING: any }) => {
  class PetTS extends Model<Pet> implements Pet {
    id: string | undefined; //! le damos la opción al cliente de setear el id como el string que quiera.
    name: string | undefined;
    specie!: Species; //! OBLIGATORIO
    race: string | undefined;
    age: Ages | undefined;
    gender: Genders | undefined;
    status!: Status; //! OBLIGATORIO
    vaccinationSchemeStatus: VaccinationStatus | undefined;
    image: string | undefined;
    comments: string | undefined;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
      PetTS.belongsTo(models.User);
    }
  }
  PetTS.init(
    {
      id: {
        type: DataTypes.STRING,
        defaultValue: UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      specie: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      race: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      age: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      vaccinationSchemeStatus: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      comments: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "PetTS",
    }
  );
  return PetTS;
};