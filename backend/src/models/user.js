// src/models/user.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/database'); // Importe a CONFIGURAÇÃO do banco, não a instância

class User extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM('admin', 'announcer'),
        allowNull: false,
        defaultValue: 'announcer',
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    }, {
      sequelize, // Passa a instância do Sequelize para a configuração do model
      modelName: 'User',
      tableName: 'Users' // O nome da tabela no banco de dados (opcional)
    });
  }
}

module.exports = User;