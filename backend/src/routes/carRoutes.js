// backend/src/routes/carRoutes.js
const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');
const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware');

// Rotas públicas (não exigem autenticação)
router.get('/', carController.getAllCars);
router.get('/:id', carController.getCarById);

// Rotas protegidas (exigem autenticação e autorização específica)
router.post('/', authenticateToken, authorizeRoles('announcer', 'admin'), carController.createCar);
router.put('/:id', authenticateToken, authorizeRoles('announcer', 'admin'), carController.updateCar);
router.delete('/:id', authenticateToken, authorizeRoles('announcer', 'admin'), carController.deleteCar);

module.exports = router;