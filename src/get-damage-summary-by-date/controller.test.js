const controller = require('./controller');

test('should return average, maximum and minimum events daily in date range', function () {
    const dateStart = '2023-12-22';
    const dateEnd = '2024-01-05';

    controller.execute(dateStart, dateEnd);
});
