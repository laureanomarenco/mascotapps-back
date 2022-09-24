import { Model } from "sequelize";
import {
    Donate
} from "../src/types/donationTypes";

module.exports = (sequelize: any, DataTypes: any ) => {
  class Donation extends Model<Donate> implements Donate {
    id!: string; //! le damos la opción al cliente de setear el id como el string que quiera. Si no ingresa nada, se genera un id UUIDV4 por default
    amount: number | undefined;
    email: string | undefined;
    static associate(models: any) {
      // define association here
      Donation.belongsTo(models.User);
    }
  }
  Donation.init({
        id: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
        amount: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: true,
        }
      },
    {
      sequelize,
      modelName: "Donation",
    }
  );
  return Donation;
};