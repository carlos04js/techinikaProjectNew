// backend/index.js

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');

// Importe seus arquivos de configuração do banco de dados
const databaseConfig = require('./config/database');

// Importe seus models
const User = require('./src/models/user');
const Car = require('./src/models/car');
const Image = require('./src/models/images');

// Importe suas rotas (você as criará nos próximos passos)
const userRoutes = require('./src/routes/userRoutes');
const carRoutes = require('./src/routes/carRoutes');
const authRoutes = require('./src/routes/authRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para habilitar CORS (permite requisições de diferentes origens)
app.use(cors());

// Middleware para analisar o corpo das requisições como JSON
app.use(express.json());

// Inicialize a conexão com o banco de dados usando Sequelize
const sequelize = new Sequelize(databaseConfig.development); // Use a configuração 'development'

// Inicialize os models com a instância do Sequelize
User.init(sequelize);
Car.init(sequelize);
Image.init(sequelize);

// Defina as associações entre os models
Car.belongsTo(User, { foreignKey: 'userId', as: 'announcer' });
Car.hasMany(Image, { foreignKey: 'carId', as: 'images', onDelete: 'CASCADE' });
Image.belongsTo(Car, { foreignKey: 'carId', onDelete: 'CASCADE' });

// Use as rotas
app.use('/api/users', userRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/auth', authRoutes);

// Rota de exemplo para verificar se o servidor está funcionando
app.get('/api/ping', (req, res) => {
  res.send('✅ Backend online');
});

// Sincronize os models com o banco de dados
sequelize.sync({ force: false }) // 'force: true' para recriar as tabelas (cuidado em produção)
  .then(() => {
    console.log('✅ Banco de dados sincronizado.');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Erro ao sincronizar o banco de dados:', error);
  });