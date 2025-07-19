const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'sua_chave_secreta_aqui';

async function registerUser(userData){
    const { firstName, lastName, username, email, password, address, phone, role } = userData;

    if (!firstName || !lastName || !username || !email || !password || !address) {
        throw new Error('Todos os campos são obrigatórios.');
    }

    const existingUser = await User.findOne({
        where:{
            [require('sequilize').Op.or]:[
                {username: username},
                {emaisl: email}
            ]
        }
    });

    if (existingUser) {
        throw new Error('Usuário já existe com este email ou username.');
    }

    const handlePassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        firstName,
        lastName,
        username,
        email,
        password: handlePassword,
        address,
        phone,
        role: role || 'announcer' // define o papel como 'announcer' por padrão
    });


const token = jwt.sign({ id: newUser.id }, JWT_SECRET, { expiresIn: '1h' });
    
    return {
        user: {
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
      isActive: newUser.isActive, // Inclua outros campos que desejar retornar
      lastLogin: newUser.lastLogin,
        },
        token: token
    };
}

async function loginUser(email, password){
 if (!email || !password) {
        throw new Error('Email e senha são obrigatórios.');
    }

    const user = await User.findOne({ where: { email: email } });

    if (!user){
        throw new Error('Usuário não encontrado.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new Error('Senha incorreta.');
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });

    return{
        user:{
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            role: user.role,
            isActive: user.isActive, // Inclua outros campos que desejar retornar
            lastLogin: user.lastLogin
        },
        token: token,
    };
}

module.exports = {
  registerUser,
  loginUser,
};
