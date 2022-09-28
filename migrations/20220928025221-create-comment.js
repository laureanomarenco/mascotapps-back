'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      provincia: {
        type: Sequelize.STRING
      },
      localidad: {
        type: Sequelize.STRING
      },
      lugar: {
        type: Sequelize.STRING
      },
      condicion: {
        type: Sequelize.STRING
      },
      comentarios: {
        type: Sequelize.STRING
      },
      fotos: {
        type: Sequelize.ARRAY
      },
      fecha: {
        type: Sequelize.STRING
      },
      hora: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Comments');
  }
};