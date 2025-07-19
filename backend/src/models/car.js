// src/models/car.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/database'); // Importe a CONFIGURAÇÃO do banco, não a instância
const User = require('./user');
const Image = require('./images');

class Car extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      manufacturer: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      model: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      version: {
        type: DataTypes.STRING,
      },
      year: {
        type: DataTypes.INTEGER,
      },
      color: {
        type: DataTypes.STRING,
      },
      fuelType: {
        type: DataTypes.ENUM('gasolina', 'álcool', 'flex', 'diesel', 'elétrico', 'híbrido'),
      },
      transmissionType: {
        type: DataTypes.ENUM('manual', 'automática'),
      },
      numberOfDoors: {
        type: DataTypes.INTEGER,
      },
      mileage: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      isArmored: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'blindado',
      },
      description: {
        type: DataTypes.TEXT,
      },
      details: {
        type: DataTypes.JSON,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
      },
      location: {
        type: DataTypes.STRING,
      },
      isFeatured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      status: {
        type: DataTypes.ENUM('ativo', 'inativo', 'vendido'),
        defaultValue: 'ativo',
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: User,
          key: 'id',
        },
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    }, {
      sequelize, // Passa a instância do Sequelize para a configuração do model
      modelName: 'Car',
      tableName: 'Cars'
    });
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'userId', as: 'announcer' });
    this.hasMany(models.Image, { foreignKey: 'carId', as: 'images', onDelete: 'CASCADE' });
  }
}

module.exports = Car;