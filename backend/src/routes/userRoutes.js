// backend/src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // <-- CORRIGIDO AQUI
const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware'); // Importe o middleware

// Rota para listar todos os usuários
// Acesso: Apenas administradores devem ter permissão para ver a lista completa de usuários.
router.get('/', authenticateToken, authorizeRoles('admin'), userController.getAllUsers); // Use findAllUsers do seu controller

// Rota para obter detalhes de um usuário específico por ID
// Acesso: Qualquer usuário autenticado pode ver seus próprios detalhes.
// Um administrador pode ver os detalhes de qualquer usuário.
// A lógica para verificar se o 'id' da URL é o mesmo que 'req.userId' estará no userController/userService.
router.get('/:id', authenticateToken, userController.getUserById);

// Rota para atualizar um usuário
// Acesso: O próprio usuário autenticado pode atualizar seus dados.
// Um administrador pode atualizar os dados de qualquer usuário.
// Novamente, a lógica de autorização (se é o próprio usuário ou admin) estará no userController/userService.
router.put('/:id', authenticateToken, userController.updateUser);

// Rota para deletar um usuário
// Acesso: Geralmente, apenas administradores podem deletar usuários arbitrários.
// Um usuário pode ter a opção de deletar sua própria conta (a lógica no controller/service cuidaria disso).
router.delete('/:id', authenticateToken, authorizeRoles('admin'), userController.deleteUser);

module.exports = router;
