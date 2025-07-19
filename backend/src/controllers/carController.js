// backend/src/controllers/carController.js
const Car = require('../models/car');
const User = require('../models/user'); // Para incluir informações do anunciante
const Image = require('../models/images'); // Para gerenciar as imagens do carro

// Obter todos os carros (com suas imagens e informações do anunciante)
async function getAllCars(req, res) {
  try {
    const cars = await Car.findAll({
      include: [
        { model: Image, as: 'images' }, // Inclui as imagens do carro
        { model: User, as: 'announcer', attributes: ['id', 'username', 'email', 'firstName', 'lastName'] } // Inclui dados do anunciante
      ]
    });
    res.status(200).json(cars);
  } catch (error) {
    console.error('Erro ao obter todos os carros:', error);
    res.status(500).json({ message: 'Erro interno do servidor ao buscar carros.', error: error.message });
  }
}

// Obter um carro específico por ID
async function getCarById(req, res) {
  try {
    const { id } = req.params;
    const car = await Car.findByPk(id, {
      include: [
        { model: Image, as: 'images' },
        { model: User, as: 'announcer', attributes: ['id', 'username', 'email', 'firstName', 'lastName'] }
      ]
    });

    if (!car) {
      return res.status(404).json({ message: 'Carro não encontrado.' });
    }
    res.status(200).json(car);
  } catch (error) {
    console.error('Erro ao obter carro por ID:', error);
    res.status(500).json({ message: 'Erro interno do servidor ao buscar carro.', error: error.message });
  }
}

// Criar um novo anúncio de carro
async function createCar(req, res) {
  try {
    // req.userId virá do middleware de autenticação, que você implementará depois
    const userId = req.userId; // ID do usuário logado que está criando o anúncio
    if (!userId) {
      return res.status(401).json({ message: 'Usuário não autenticado.' }); // Isso deve ser capturado pelo middleware antes
    }

    const { images, ...carData } = req.body; // Separa as URLs das imagens do restante dos dados do carro

    // Adiciona o userId ao carData para associar o carro ao anunciante
    carData.userId = userId;

    const newCar = await Car.create(carData);

    // Se houver imagens fornecidas, crie os registros na tabela de imagens
    if (images && Array.isArray(images) && images.length > 0) {
      const imageRecords = images.map(url => ({ url: url, carId: newCar.id }));
      await Image.bulkCreate(imageRecords); // bulkCreate para inserir múltiplas imagens de uma vez
    }

    // Retorna o carro criado com suas imagens
    const createdCarWithImages = await Car.findByPk(newCar.id, {
      include: [
        { model: Image, as: 'images' },
        { model: User, as: 'announcer', attributes: ['id', 'username', 'email', 'firstName', 'lastName'] }
      ]
    });

    res.status(201).json({ message: 'Anúncio de carro criado com sucesso!', car: createdCarWithImages });

  } catch (error) {
    console.error('Erro ao criar carro:', error);
    res.status(400).json({ message: 'Erro ao criar anúncio de carro.', error: error.message });
  }
}

// Atualizar um anúncio de carro
async function updateCar(req, res) {
  try {
    const { id } = req.params;
    const userId = req.userId; // ID do usuário logado

    const { images, ...carData } = req.body;

    const car = await Car.findByPk(id);

    if (!car) {
      return res.status(404).json({ message: 'Anúncio de carro não encontrado.' });
    }

    // Autorização: O usuário logado deve ser o anunciante do carro ou um admin
    // Isso será melhor tratado com um middleware de autorização mais tarde
    if (car.userId !== userId && req.userRole !== 'admin') { // req.userRole virá do middleware
      return res.status(403).json({ message: 'Você não tem permissão para atualizar este anúncio.' });
    }

    const [updatedRows] = await Car.update(carData, {
      where: { id: id }
    });

    if (updatedRows === 0) {
      return res.status(400).json({ message: 'Nenhuma alteração foi feita ou anúncio não pôde ser atualizado.' });
    }

    // Atualizar imagens: pode ser mais complexo (deletar antigas, adicionar novas)
    // Para simplificar agora, você pode deletar todas as imagens existentes e adicionar as novas
    if (images && Array.isArray(images)) {
      await Image.destroy({ where: { carId: id } }); // Deleta todas as imagens existentes
      if (images.length > 0) {
        const imageRecords = images.map(url => ({ url: url, carId: id }));
        await Image.bulkCreate(imageRecords); // Adiciona as novas imagens
      }
    }

    const updatedCar = await Car.findByPk(id, {
      include: [
        { model: Image, as: 'images' },
        { model: User, as: 'announcer', attributes: ['id', 'username', 'email', 'firstName', 'lastName'] }
      ]
    });

    res.status(200).json({ message: 'Anúncio de carro atualizado com sucesso!', car: updatedCar });

  } catch (error) {
    console.error('Erro ao atualizar carro:', error);
    res.status(500).json({ message: 'Erro interno do servidor ao atualizar anúncio de carro.', error: error.message });
  }
}

// Deletar um anúncio de carro
async function deleteCar(req, res) {
  try {
    const { id } = req.params;
    const userId = req.userId; // ID do usuário logado

    const car = await Car.findByPk(id);

    if (!car) {
      return res.status(404).json({ message: 'Anúncio de carro não encontrado para exclusão.' });
    }

    // Autorização: O usuário logado deve ser o anunciante do carro ou um admin
    if (car.userId !== userId && req.userRole !== 'admin') {
      return res.status(403).json({ message: 'Você não tem permissão para deletar este anúncio.' });
    }

    const deletedRows = await Car.destroy({
      where: { id: id }
    });

    if (deletedRows === 0) {
      return res.status(400).json({ message: 'Nenhuma alteração foi feita ou anúncio não pôde ser deletado.' });
    }

    res.status(200).json({ message: 'Anúncio de carro deletado com sucesso!' });
  } catch (error) {
    console.error('Erro ao deletar carro:', error);
    res.status(500).json({ message: 'Erro interno do servidor ao deletar anúncio de carro.', error: error.message });
  }
}

module.exports = {
  getAllCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
};