const { where } = require('sequelize');
const user = require('../models/user');

// obter todos os usuários
async function getAllUsers(req, res) {
try{
    const users = await User.fildAll({
        atribute: {exclude: ['password'] }
    })
  res.status(200).json(users);
}catch (error) {
    console.error('Erro ao obter todos os usuários:', error);
    res.status(500).json({ message: 'Erro interno do servidor ao buscar usuários.', error: error.message });
  }
}

// obter usuário por ID
async function getUserById(req, res){
    try{
        const {id} = await User.finByPk(id, {
            attributes: { exclude: ['password'] }
        });
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        res.status(200).json(user)
    }catch (error){
        console.error('Erro ao obter usuário po ID', error);
        res.status(500).json({message: 'Erro interno do servidor ao buscar usuário por ID.', error: error.message });
    }
}

// atualizar usuário
async function updateUser(req, res){
    try{
        const {id} = req.params;
        const {firstName, lastName, userName, emai, adress, phone, isActive, role} = req.body;

        const user = await User.findByPk(id);

        if (!user){
            return res.status(404).json({ message: 'Usuário não encontrado.' });

        }
           // Apenas permitir atualização de certos campos, e com validação de role se for o caso
    // Para produção, seria importante verificar se o usuário logado tem permissão para atualizar ESTE usuário
    // Por exemplo, um usuário só pode atualizar seus próprios dados, a menos que seja um admin.
    const [updateRows] = await User.update(
        {firstName, lastName, userName, email, address, phone, isActive, role},
        {where: { id: id } }
    );
    if (updateRows === 0) {
        return res.status(404).json({ message: 'Nenhum usuário foi atualizado.' });
    }

    const updatedUser = await User.findByPk(id, {
        attributes: { exclude: ['password'] }
    }) 

 res.status(200).json({ message: 'Usuário atualizado com sucesso!', user: updatedUser });
} catch (error){
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ message: 'Erro interno do servidor ao atualizar usuário.', error: error.message });
  }
}

// deletar usuário
async function deleteUser(req, res) {
  try {
    const { id } = req.params;

    const deletedRows = await User.destroy({
      where: { id: id }
    });

    if (deletedRows === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado para exclusão.' });
    }

    res.status(200).json({ message: 'Usuário deletado com sucesso!' });
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    res.status(500).json({ message: 'Erro interno do servidor ao deletar usuário.', error: error.message });
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};