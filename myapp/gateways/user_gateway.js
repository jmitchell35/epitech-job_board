import prisma from '../persistence/prisma.js';

class UserGateway {
  getAll() {
    return prisma.user.findMany();
  }
}