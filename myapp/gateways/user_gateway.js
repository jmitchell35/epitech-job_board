import prisma from '../persistence/prisma.js';

class UserGateway {
  async getAll() {
    let data = await prisma.user.findMany();
    console.log(data);
    return data;
  }

  async get(uuid) {
    let data = await prisma.user.findUnique({
      where: {
        id: uuid
      }
    });
    console.log(data);
    return data;
  }

  async getByEmail(email) {
    let data = await prisma.user.findUnique({
      where: {
        email
      }
    });
    console.log(data);
    return data;
  }

  async create(jsonData) {
    let createdData = await prisma.user.create({
      data: jsonData
    })
    console.log(createdData);
    return createdData;
  }

  async update(uuid, jsonData) {
    let updatedData = await prisma.user.update({
      where: {
        id: uuid
      },
      data: jsonData,
    });
    console.log(updatedData);
    return updatedData;
  }

  async delete(uuid) {
    let deletedData = await prisma.user.delete({
      where: {
        id: uuid
      }
    });
    console.log(deletedData);
    return deletedData;
  }

  async findOneByAttribute(attribute, value) {
    let data = await prisma.user.findMany({
      where: {
        [attribute]: value,
      }
    });
    console.log(data);
    return data;
  }

  async findManyByAttribute(attribute, value) {
    let data = await prisma.user.findMany({
      where: {
        [attribute]: value,
      }
    });
    console.log(data);
    return data;
  }
}

export default new UserGateway();