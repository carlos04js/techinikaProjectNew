// src/models/image.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/database'); // Importe a CONFIGURAÇÃO do banco, não a instância
const Car = require('./car');

class Image extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      carId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Car,
          key: 'id',
        },
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    }, {
      sequelize, // Passa a instância do Sequelize para a configuração do model
      modelName: 'Image',
      tableName: 'Images'
    });
  }

  static associate(models) {
    this.belongsTo(models.Car, { foreignKey: 'carId', onDelete: 'CASCADE' });
  }
}

module.exports = Image;