import prisma from '../persistence/prisma.js';

class AdvertisementGateway {
  async getAll() {
    let data = await prisma.advertisement.findMany();
    console.log(data);
    return data;
  }

  async get(uuid) {
    let data = await prisma.advertisement.findUnique({
      where: {
        id: uuid
      }
    });
    console.log(data);
    return data;
  }

  async create(jsonData) {
    let createdData = await prisma.advertisement.create(jsonData)
    console.log(createdData);
    return createdData;
  }

  async update(uuid, jsonData) {
    let updatedData = await prisma.advertisement.update({
      where: {
        id: uuid
      },
      data: jsonData,
    });
    console.log(updatedData);
    return updatedData;
  }

  async delete(uuid) {
    let deletedData = await prisma.advertisement.delete({
      where: {
        id: uuid,
      }
    });
    console.log(deletedData);
    return deletedData;
  }
}

export default new AdvertisementGateway();