'use strict';
const { Model, UUIDV4 } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Visitor extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Visitor.init({
        id: DataTypes.STRING,
        defaultValue: UUIDV4,
        primaryKey: true,
    }, {
        sequelize,
        modelName: 'Visitor',
    });
    return Visitor;
};
