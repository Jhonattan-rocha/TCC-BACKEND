"use strict";'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('subcategorias', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        primaryKey: true
      },
      id_categoria:{
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {model: "categorias", key: "id"},
      },
      prioridade: {
        type: Sequelize.INTEGER,
        defaultValue: 5,
        validate: {
          validartamanho: function(value){
            if(value < 1 || value > 5){
              throw new Error("Prioridade Invalida")
            }
          }
        }
      },
      nome: { 
        type: Sequelize.STRING(200),
      },
      criador: {
        type: Sequelize.STRING(200)
      },
      created_at: {
          type: Sequelize.DATE,
          allowNull: false,
      },
      updated_at: {
          type: Sequelize.DATE, 
          allowNull: false
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('subcategorias');
  }
};
