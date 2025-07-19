const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authService = require('../services/authService');
const JWT_SECRET = process.env.JWT_SECRET ||'sua_chave_secreta_aqui';

async function register (req, res){
    try{
       const { firstName, lastName, username, email, password, address, phone, role } = req.body;

         // validação dos campos obrigatórios
         if (!firtsName ||!lastName || !username || !email || !password || !address ) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    const existingUser = await User.findOne({
        where: {
            //busca por email ou username (case sensitive para email)
            [require('sequelize').Op.or]: [
                { email: email },
                { username: username }
            ]
        }
    })

    if (existingUser) {
        return res.status(400).json({ error: 'Usuário já existe com este email ou username.' });
    }

    // encripta a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // cria o usuário
    const newUser = await User.create({
        firstName,
        lastName,
        username,
        email,
        password: hashedPassword,
        address,
        phone,
        role: role || 'announcer' // define o papel como 'announcer' por padrão
    });

    // gera o token JWT
    const token = jwt.sign({ id: newUser.id }, JWT_SECRET, { expiresIn: '1h' });

    // retorna o usuário criado e o token
    return res.status(201).json({
        user: {
            id: newUser.id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            username: newUser.username,
            email: newUser.email,
            address: newUser.address,
            phone: newUser.phone,
            role: newUser.role
        },
        token: token
    });
  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({ message: 'Erro interno do servidor ao registrar usuário.', error: error.message });
  }
}

// Função de login
async function login (req, res) {
    try{
        const { email, password } = req.body;

        // Verifica se o email e a senha foram fornecidos
        if (!email || !password) {
            return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
        }
        // Busca o usuário pelo email
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            return res.status(404).json({ error: 'Credenciais inválidas.' });
        }

        // Verifica a senha
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Credenciais inválidas.' });
        }
        // Gera o token JWT
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });

        // Retorna o usuário e o token
        return res.status(200).json({
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                email: user.email,
                address: user.address,
                phone: user.phone,
                role: user.role
            },
            token: token
        });

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro interno do servidor ao fazer login.', error: error.message });
  }
}
module.exports = {
    register,
    login,
};