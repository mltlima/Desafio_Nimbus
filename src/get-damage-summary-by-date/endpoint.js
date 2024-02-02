const controller = require('./controller');

const execute = async (req, res) => {
    try {
        const { dateStart, dateEnd } = req.query;

        const damageSummaries = await controller.execute(dateStart, dateEnd);

        // Se tudo estiver correto, envia a resposta com os sumários de danos
        res.json(damageSummaries);
    } catch (error) {
        // Se um erro for lançado, verifica o tipo e envia a resposta HTTP apropriada
        if (error.message.includes('required')) {
            res.status(400).json({ message: error.message });
        } else {
            // Para qualquer outro erro, envia um erro de servidor
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

module.exports = {
    execute,
};
