// backend/config/database.js

const { Sequelize } = require('sequelize');
const path = require('path');

const databasePath = path.resolve(__dirname, '..', 'database.sqlite'); // Caminho para o arquivo do banco de dados SQLite

module.exports = {
  development: {
    dialect: 'sqlite',
    storage: databasePath,
    logging: false, // Desativa o logging das queries SQL no console (opcional)
  },
  // Você pode adicionar configurações para outros ambientes (test, production) aqui, se necessário.
  // Por exemplo:
  // test: {
  //   dialect: 'sqlite',
  //   storage: ':memory:', // Banco de dados em memória para testes
  //   logging: false,
  // },
  // production: {
  //   dialect: 'sqlite',
  //   storage: '/path/to/production.sqlite',
  //   logging: false,
  // },
};