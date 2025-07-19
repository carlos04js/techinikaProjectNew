const User = require('../models/user');

async function findAllUsers() {
    const users = await User.findAll({
        attributes: { exclude: ['password'] },
    });
    return users;
}

async function findUserById(id) {
    const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
    if (!user) {
        throw new Error('Usuário não encontrado.');
    }
    return user;
}

async function updateUser(id, userData) {
    const user = await User.findByPk(id);
    if (!user) {
        throw new Error('Usuário não encontrado.');
    }
    if (userData.password) {
        delete userData.password;
    }

    // Atualiza o usuário
    const [updatedRows] = await User.update(userData, {
        where: { id: id }
    });

    if (updatedRows === 0) {
        // Se 0 linhas foram afetadas, pode ser que o ID não exista ou não houve mudança nos dados
        throw new Error('Nenhuma alteração foi feita ou usuário não pôde ser atualizado.');
    }

    // Retorna o usuário atualizado (sem a senha)
    const updatedUser = await User.findByPk(id, {
        attributes: { exclude: ['password'] }
    });
    return updatedUser;
}

async function deleteUser(id) {
    const deletedRows = await User.destroy({
        where: { id: id }
    });

    if (deletedRows === 0) {
        throw new Error('Usuário não encontrado para exclusão.');
    }
    return { message: 'Usuário deletado com sucesso!' }; // Mensagem de sucesso
}

module.exports = {
    findAllUsers,
    findUserById,
    updateUser,
    deleteUser,
};