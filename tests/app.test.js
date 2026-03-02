const request = require('supertest');
const app = require('../app');
const { calculateValue } = require('../lib/logic');

describe('Suite de Pruebas de Calidad de Software', () => {

  describe('Pruebas Unitarias - Lógica de Inventario', () => {

    test('Debe calcular correctamente el valor total (20 * 3 = 60)', () => {
      const result = calculateValue(20, 3);
      expect(result).toBe(60);
    });

    test('Debe manejar valores decimales correctamente (10.5 * 2 = 21)', () => {
      const result = calculateValue(10.5, 2);
      expect(result).toBe(21);
    });

    test('Debe retornar 0 si el precio es negativo', () => {
      const result = calculateValue(-5, 10);
      expect(result).toBe(0);
    });

    test('Debe retornar 0 si se pasan valores no numéricos', () => {
      const result = calculateValue("abc", 5);
      expect(result).toBe(0);
    });

  });

 
  describe('Pruebas de Integración - API Endpoints', () => {

    test('GET /health - Debe responder con status 200 y Content-Type JSON', async () => {
      const response = await request(app).get('/health');
      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toMatch(/json/);
    });

    test('GET /items - Debe retornar un array no vacío', async () => {
      const response = await request(app).get('/items');
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    test('GET /items - Cada item debe tener stock numérico válido', async () => {
      const response = await request(app).get('/items');
      const item = response.body[0];

      expect(typeof item.stock).toBe('number');
      expect(item.stock).toBeGreaterThanOrEqual(0);
    });

    test('GET ruta inexistente - Debe retornar 404', async () => {
      const response = await request(app).get('/no-existe');
      expect(response.statusCode).toBe(404);
    });
    test('GET /health - Debe retornar status "OK" en el body', async () => {
  const response = await request(app).get('/health');

  expect(response.statusCode).toBe(200);
  expect(response.body).toHaveProperty('status');
  expect(response.body.status).toBe('OK');
});

  });

});