// backend/src/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Certifique-se de que o caminho está correto

const JWT_SECRET = process.env.JWT_SECRET; // Carrega a chave secreta das variáveis de ambiente

// Middleware para verificar o token JWT
async function authenticateToken(req, res, next) {
    // 1. Obter o cabeçalho de autorização
    const authHeader = req.headers['authorization'];
    // Formato esperado: "Bearer SEU_TOKEN"
    const token = authHeader && authHeader.split(' ')[1];

    // 2. Verificar se o token existe
    if (!token) {
        return res.status(401).json({ message: 'Acesso negado: Token não fornecido.' });
    }

    try {
        // 3. Verificar e decodificar o token
        const decoded = jwt.verify(token, JWT_SECRET);

        // 4. Buscar o usuário no banco de dados
        const user = await User.findByPk(decoded.id);

        if (!user) {
            return res.status(401).json({ message: 'Acesso negado: Usuário associado ao token não encontrado ou inativo.' });
        }

        // 5. Anexar informações do usuário ao objeto req
        // Seus controllers esperam req.userId e req.userRole
        req.userId = user.id;
        req.userRole = user.role; // Assumindo que seu modelo User tem uma propriedade 'role'

        // 6. Chamar o próximo middleware ou controller
        next();

    } catch (error) {
        console.error('Erro na autenticação do token:', error);
        // Lida com tokens inválidos ou expirados
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expirado. Por favor, faça login novamente.' });
        }
        return res.status(403).json({ message: 'Token inválido. Acesso proibido.' });
    }
}

// Middleware de autorização (exemplo: verifica se o usuário é 'admin')
function authorizeRoles(...allowedRoles) {
    return (req, res, next) => {
        if (!req.userRole || !allowedRoles.includes(req.userRole)) {
            return res.status(403).json({ message: 'Acesso proibido: Você não tem permissão para realizar esta ação.' });
        }
        next();
    };
}

module.exports = {
    authenticateToken,
    authorizeRoles
};