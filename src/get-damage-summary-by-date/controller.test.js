const controller = require('./controller');
const repository = require('./repository');

jest.mock('./repository', () => ({
    execute: jest.fn()
  }));

describe('Controller execute function scenarios', () => {

    beforeEach(() => {
        repository.execute.mockClear();
    });

    afterEach(() => {
        jest.resetAllMocks();
      });

  // 1. Dias consecutivos com eventos
  test('should handle consecutive days with events correctly', async () => {

    repository.execute.mockResolvedValue([
        { date: new Date('2023-12-22'), event: 'Chuva forte', damage: 80 },
        { date: new Date('2023-12-22'), event: 'Vento forte', damage: 60 },
        { date: new Date('2023-12-23'), event: 'Chuva forte', damage: 100 },
        { date: new Date('2023-12-23'), event: 'Vento forte', damage: 40 },
    ]);

    const dateStart = '2023-12-22';
    const dateEnd = '2023-12-23';
    const result = await controller.execute(dateStart, dateEnd);

    expect(result).toEqual({
      data: [
        {
          date: '2023-12-22',
          avgDamage: 70,
          maxDamageEvent: { event: 'Chuva forte', damage: 80 },
          minDamageEvent: { event: 'Vento forte', damage: 60 },
        },
        {
          date: '2023-12-23',
          avgDamage: 70,
          maxDamageEvent: { event: 'Chuva forte', damage: 100 },
          minDamageEvent: { event: 'Vento forte', damage: 40 },
        }
      ]
    });
  });

  // 2. Dias sem eventos
  test('should include days without events with avgDamage as 0 and max/minDamageEvent as null', async () => {

    repository.execute.mockResolvedValue([
        { date: new Date('2023-12-22'), event: 'Chuva forte', damage: 80 },
        { date: new Date('2023-12-22'), event: 'Vento forte', damage: 60 },
    ]);

    const dateStart = '2023-12-24';
    const dateEnd = '2023-12-25';
    const result = await controller.execute(dateStart, dateEnd);

      expect(result).toEqual({
          data: [
          {
              date: '2023-12-24',
              avgDamage: 0,
              maxDamageEvent: null,
              minDamageEvent: null,
          },
          {
              date: '2023-12-25',
              avgDamage: 0,
              maxDamageEvent: null,
              minDamageEvent: null,
          }
          ]
      });
  });

  // 3. Intervalo que inclui dias com e sem eventos
  test('should handle a date range including both days with and without events', async () => {
    
    repository.execute.mockResolvedValue([
        { date: new Date('2023-12-22'), event: 'Chuva forte', damage: 80 },
        { date: new Date('2023-12-22'), event: 'Vento forte', damage: 60 },
    ]);

    const dateStart = '2023-12-22';
    const dateEnd = '2023-12-25';
    const result = await controller.execute(dateStart, dateEnd);

      expect(result).toEqual({
          data: [
          {
              date: '2023-12-22',
              avgDamage: 70,
              maxDamageEvent: { event: 'Chuva forte', damage: 80 },
              minDamageEvent: { event: 'Vento forte', damage: 60 },
          },
          {
              date: '2023-12-23',
              avgDamage: 0,
              maxDamageEvent: null,
              minDamageEvent: null,
          },
          {
              date: '2023-12-24',
              avgDamage: 0,
              maxDamageEvent: null,
              minDamageEvent: null,
          },
          {
              date: '2023-12-25',
              avgDamage: 0,
              maxDamageEvent: null,
              minDamageEvent: null,
          }
          ]
      });
  });

  // 4. Dia único com múltiplos eventos
  test('should calculate avg, max, and min damages correctly for a single day with multiple events', async () => {

    repository.execute.mockResolvedValue([
        { date: new Date('2023-12-22'), event: 'Chuva forte', damage: 80 },
        { date: new Date('2023-12-22'), event: 'Vento forte', damage: 60 },
    ]);

    const dateStart = '2023-12-22';
    const dateEnd = '2023-12-22';
    const result = await controller.execute(dateStart, dateEnd);

      expect(result).toEqual({
          data: [
          {
              date: '2023-12-22',
              avgDamage: 70,
              maxDamageEvent: { event: 'Chuva forte', damage: 80 },
              minDamageEvent: { event: 'Vento forte', damage: 60 },
          }
          ]
      });
  });

  // 5. Intervalo sem nenhum evento
  test('should return correct result for a date range with no events', async () => {
    
    repository.execute.mockResolvedValue([]);

    const dateStart = '2024-01-01';
    const dateEnd = '2024-01-05';
    const result = await controller.execute(dateStart, dateEnd);

      expect(result).toEqual({
          data: [
          {
              date: '2024-01-01',
              avgDamage: 0,
              maxDamageEvent: null,
              minDamageEvent: null,
          },
          {
              date: '2024-01-02',
              avgDamage: 0,
              maxDamageEvent: null,
              minDamageEvent: null,
          },
          {
              date: '2024-01-03',
              avgDamage: 0,
              maxDamageEvent: null,
              minDamageEvent: null,
          },
          {
              date: '2024-01-04',
              avgDamage: 0,
              maxDamageEvent: null,
              minDamageEvent: null,
          },
          {
              date: '2024-01-05',
              avgDamage: 0,
              maxDamageEvent: null,
              minDamageEvent: null,
          }
          ]
      });
  });
});  
