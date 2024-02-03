const repository = require('./repository');

// Função para gerar um array de todas as datas entre dois limites, garantindo que todas as datas no intervalo sejam consideradas
function generateDateRange(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const dateRange = [];
    for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
        // Formata cada data para YYYY-MM-DD antes de adicionar ao array
        dateRange.push(new Date(date).toISOString().split('T')[0]);
    }
    return dateRange;
}

// Função para validar o formato de uma data
function isValidDate(dateString) {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
}

module.exports = {
    async execute(dateStart, dateEnd) {

        if (!isValidDate(dateStart) || !isValidDate(dateEnd)) {
            throw new Error('Invalid date format');
        }

        // Validando o intervalo de datas
        if (new Date(dateStart) > new Date(dateEnd)) {
            throw new Error('Invalid date range: start date is after end date.');
        }

        const dbAlerts = await repository.execute(dateStart, dateEnd);
        // Gera um intervalo de datas para garantir a inclusão de todas as datas no intervalo especificado
        const dateRange = generateDateRange(dateStart, dateEnd);

        // Mapeia cada data para um resumo de danos, tratando dias com e sem eventos
        const summarizedData = dateRange.map(date => {
            // Filtra alertas para a data atual, permitindo a comparação direta com a string da data
            const alertsForDate = dbAlerts.filter(alert => alert.date.toISOString().split('T')[0] === date);
            // Extrai os valores de dano para cálculo
            const damages = alertsForDate.map(alert => alert.damage);

            // Calcula o dano total e a média de danos para a data atual
            const totalDamage = damages.reduce((acc, cur) => acc + cur, 0, 0);
            const avgDamage = damages.length > 0 ? totalDamage / damages.length : 0;

            // Identifica os eventos de dano máximo e mínimo, se existirem
            const maxDamageEvent = damages.length > 0 ? alertsForDate.reduce((max, alert) => max.damage > alert.damage ? max : alert) : null;
            const minDamageEvent = damages.length > 0 ? alertsForDate.reduce((min, alert) => min.damage < alert.damage ? min : alert) : null;

            // Retorna o resumo para a data atual, incluindo tratamento para datas sem eventos
            return {
                date,
                avgDamage,
                maxDamageEvent: maxDamageEvent ? { event: maxDamageEvent.event, damage: maxDamageEvent.damage } : null,
                minDamageEvent: minDamageEvent ? { event: minDamageEvent.event, damage: minDamageEvent.damage } : null,
            };
        });

        // Retorna os dados resumidos, já encapsulados em um objeto para padronizar a estrutura de resposta
        return { data: summarizedData };
    },
};
