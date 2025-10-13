import prisma from '../persistence/prisma.js';

class RecruiterGateway {
  async getAll() {
    let data = await prisma.recruiter.findMany();
    console.log(data);
    return data;
  }

  async get(uuid) {
    let data = await prisma.recruiter.findUnique({
      where: {
        id: uuid
      }
    });
    console.log(data);
    return data;
  }

  async create(jsonData) {
    let createdData = await prisma.recruiter.create({
      data: jsonData,
    });
    console.log(createdData);
    return createdData;
  }

  async update(uuid, jsonData) {
    let updatedData = await prisma.recruiter.update({
      where: {
        id: uuid
      },
      data: jsonData,
    });
    console.log(updatedData);
    return updatedData;
  }

  async delete(uuid) {
    let deletedData = await prisma.recruiter.delete({
      where: {
        id: uuid,
      }
    });
    console.log(deletedData);
    return deletedData;
  }
}

export default new RecruiterGateway();