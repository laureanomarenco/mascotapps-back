'use strict';
const {
  Model, UUIDV4
} = require('sequelize');
import { visitor } from "../src/types/visitorTypes";

module.exports = (sequelize: any , DataTypes: any) => {
  class Visitor extends Model <visitor> implements visitor{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id:undefined 
    static associate(models: any) {
      // define association here
    }
  }
  Visitor.init({
    id:{
    type: DataTypes.STRING,
    defaultValue: UUIDV4,
    primaryKey: true,
  }
  }, {
    sequelize,
    modelName: 'Visitor',
  });
  return Visitor;
};