const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    async execute(dateStart, dateEnd) {
        try {
            const alerts = await prisma.alert.findMany({
                where: {
                    date: {
                        gte: new Date(dateStart),
                        lte: new Date(dateEnd)
                    }
                },
                orderBy: {
                    date: 'desc'
                }
            });

            return alerts;
        } catch (error) {
            throw error;
        }
    },
};
