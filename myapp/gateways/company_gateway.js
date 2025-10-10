import prisma from '../persistence/prisma.js';

class CompanyGateway {
  async getAll() {
    let data = await prisma.company.findMany();
    console.log(data);
    return data;
  }

  async get(uuid) {
    let data = await prisma.company.findUnique({
      where: {
        id: uuid
      }
    });
    console.log(data);
    return data;
  }

  async create(jsonData) {
    let createdData = await prisma.company.create({
      data: jsonData
    })
    console.log(createdData);
    return createdData;
  }

  async update(uuid, jsonData) {
    let updatedData = await prisma.company.update({
      where: {
        id: uuid
      },
      data: jsonData,
    });
    console.log(updatedData);
    return updatedData;
  }

  async delete(uuid) {
    let deletedData = await prisma.company.delete({
      where: {
        id: uuid,
      }
    });
    console.log(deletedData);
    return deletedData;
  }
}

export default new CompanyGateway();