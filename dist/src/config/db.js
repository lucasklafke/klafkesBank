import pkg from "@prisma/client"; // precisamos instalar esse pacote!
var PrismaClient = pkg.PrismaClient;
var prisma = new PrismaClient();
export default prisma;
