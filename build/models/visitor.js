'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const { Model, UUIDV4 } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Visitor extends Model {
        static associate(models) {
            // define association here
        }
    }
    Visitor.init({
        id: {
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
