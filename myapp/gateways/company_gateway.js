import prisma from '../persistence/prisma.js';

class CompanyGateway {
  async getAll() {
    let data = await prisma.company.findMany();
    console.log(data);
    return data;
  }
}

export default new CompanyGateway();