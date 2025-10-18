import prisma from '../persistence/prisma.js';

class CandidateGateway {
  async getAll() {
    let data = await prisma.candidate.findMany();
    console.log(data);
    return data;
  }

  async get(uuid) {
    let data = await prisma.candidate.findUnique({
      where: {
        id: uuid
      }
    });
    console.log(data);
    return data;
  }



  async create(jsonData) {
    let createdData = await prisma.candidate.create({
      data: jsonData
  })
    console.log(createdData);
    return createdData;
  }

  async update(uuid, jsonData) {
    let updatedData = await prisma.candidate.update({
      where: {
        id: uuid
      },
      data: jsonData,
    });
    console.log(updatedData);
    return updatedData;
  }

  async delete(uuid) {
    let deletedData = await prisma.candidate.delete({
      where: {
        id: uuid,
      }
    });
    console.log(deletedData);
    return deletedData;
  }

  async findOneByAttribute(attribute, value) {
    let data = await prisma.candidate.findUnique({
      where: {
        [attribute]: value,
      }
    });
    console.log(data);
    return data;
  }
}

export default new CandidateGateway();