const Car = require('../models/car');
const Images = require('../models/images');
const User = require('../models/user');
const { Op } = require('sequelize'); // Importe Op para operadores de query, se precisar de buscas mais complexas no futuro

async function getAllCarsService(){
    try {
        const cars = await Car.findAll({
            include: [
                {model: Images, as: 'images'},
                {model: User, as: 'announcer', attributes:['id', 'username', 'email', 'firtName', 'lastName']} 

            ]
        });
        return cars;
    } catch(error) {
        console.log ('Erro no serviço ao obter todos os carros', error);
        throw new Error('Erro ao obter todos os carros');
    }
}

async function getCarByIdService(carId){
    try{
        const car = await Car.findByPk(carId, {
            include:[
                {model: Images, as: 'images'},
                {model: User, as: 'announcer', attributes:['id', 'username', 'email', 'firtName', 'lastName']}
            ]
        });
        if (!car){
            throw new error('Carro não encontrado ', error)
        }
        return car;
    } catch(error) {
        console.log('Erro no serviço ao obter carro por ID', error);
        throw new Error('Erro ao obter carro por ID');
    }
}

async function createCarService(carData, imagesUrls, userId){
    try{
        if (!userId) {
            throw new Error('ID do usuário é obrigatório para criar um anúncio de carro.');
        }
        if (!carData.manufacturer || !carData.model || !carData.mileage || !carData.price) {
            throw new Error('Campos essenciais como fabricante, modelo, quilometragem e preço são obrigatórios.');
        }

        carData.userId = userId; // Atribui o ID do usuário ao carro
        const newCar = await Car.create(carData);

          if (imageUrls && Array.isArray(imageUrls) && imageUrls.length > 0) {
            const imageRecords = imageUrls.map(url => ({ url: url, carId: newCar.id }));
            await Image.bulkCreate(imageRecords);
        }

        const createCarWithDetails = await Car.findByPk(newCar.id, {
include: [
                {model: Images, as: 'images'},
                {model: User, as: 'announcer', attributes:['id', 'username', 'email', 'firtName', 'lastName']}
            ]
        })

        return createCarWithDetails;
    }catch(error) {
        console.log('Erro no serviço ao criar carro', error);
        throw new Error('Erro ao criar carro');
    }
}

async function updateCarService(carId, carData, imagesUrls, userId, userRole){
    try{
        const car = await Car.findByPk(carId)

        if (!car) {
            throw new Error('Carro não encontrado');
        }

        if (car.userId !== userId && userRole !== 'admin') {
            throw new Error('Você não tem permissão para atualizar este carro');
        }

        const [updatedRows] = await Car.update(carData, {
            where: { id: carId }
        });

        if (updatedRows === 0) {
            throw new Error('Nenhum carro foi atualizado');
        }

        if (imageUrls && Array.isArray(imageUrls)) {
            await Image.destroy({ where: { carId: carId } });
            if (imageUrls.length > 0) {
                const imageRecords = imageUrls.map(url => ({ url: url, carId: carId }));
                await Image.bulkCreate(imageRecords);
            }
        }

        const updatedCar = await Car.findByPk(carId,{
            include: [
                { model: Images, as: 'images' },
                { model: User, as: 'announcer', attributes: ['id', 'username', 'email', 'firtName', 'lastName'] }
            ]
        });
        return updatedCar;

    } catch(error) {
        console.log('Erro no serviço ao atualizar carro', error);
        throw new Error('Erro ao atualizar carro');
    }
}

async function deleteCarService(carId, userId, userRole) {
    try {
        const car = await Car.findByPk(carId);

        if (!car) {
            throw new Error('Anúncio de carro não encontrado para exclusão.');
        }

        // Autorização: verifica se o usuário logado é o anunciante ou um admin
        if (car.userId !== userId && userRole !== 'admin') {
            throw new Error('Você não tem permissão para deletar este anúncio.');
        }

        // As imagens serão deletadas em cascata graças ao onDelete: 'CASCADE' no modelo Image
        const deletedRows = await Car.destroy({
            where: { id: carId }
        });

        if (deletedRows === 0) {
            throw new Error('Nenhuma alteração foi feita ou anúncio não pôde ser deletado.');
        }

        return { message: 'Anúncio de carro deletado com sucesso!' };
    } catch (error) {
        console.error('Erro no serviço ao deletar carro:', error);
        throw error;
    }
}

module.exports = {
    getAllCarsService,
    getCarByIdService,
    createCarService,
    updateCarService,
    deleteCarService,
};