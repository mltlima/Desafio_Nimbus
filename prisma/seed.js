const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const alertsData = require('../data/alerts.json');


async function main() {
  for (const alert of alertsData) {
    await prisma.alert.create({
      data: alert,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
