const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const alertsData = require('../data/alerts.json');


async function main() {
  for (const alert of alertsData) {
    await prisma.alert.create({
      data: {
        date: new Date(alert.date + "T00:00:00.000Z"),
        event: alert.event,
        damage: alert.damage,
      }
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
