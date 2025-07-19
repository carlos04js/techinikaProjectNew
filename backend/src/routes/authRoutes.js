// backend/src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
//rotas para regsitros de usuários
router.post('/register', authController.register);
//rotas para login de usuários
router.post('/login', authController.login);


// Defina suas rotas aqui (por enquanto, pode estar vazio)

module.exports = router;