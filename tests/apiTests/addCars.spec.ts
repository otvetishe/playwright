import { test, expect, request, APIRequestContext } from '@playwright/test';

test.describe('API Tests for creating cars', () => {
  let apiContext: APIRequestContext;

  test.beforeAll(async () => {
    apiContext = await request.newContext({
      baseURL: 'https://qauto.forstudy.space'
    });
  });

  test('Successfully create a car', async () => {
    const response = await apiContext.post('/api/cars', {
      data: {
        carBrandId: 1,
        carModelId: 1,
        mileage: 123124
      }
    });

    console.log('Response status:', response.status());
    const responseBody = await response.json();
    console.log('Response body:', responseBody);

    expect(response.ok()).toBeTruthy();
    expect(responseBody.status).toBe('ok');
    expect(responseBody.data).toHaveProperty('id');
    expect(responseBody.data.brand).toBe('Audi');
    expect(responseBody.data.model).toBe('TT');
  });

  test('Create a car with missing carBrandId', async () => {
    const response = await apiContext.post('/api/cars', {
      data: {
        carModelId: 1,
        mileage: 123124
      }
    });

    console.log('Response status:', response.status());
    const responseBody = await response.json();
    console.log('Response body:', responseBody);

    expect(response.status()).toBe(400);
    expect(responseBody.status).toBe('error');
    expect(responseBody.message).toContain('Car brand id is required');
  });

  test('Create a car with missing carModelId', async () => {
    const response = await apiContext.post('/api/cars', {
      data: {
        carBrandId: 1,
        mileage: 123124
      }
    });

    console.log('Response status:', response.status());
    const responseBody = await response.json();
    console.log('Response body:', responseBody);

    expect(response.status()).toBe(400);
    expect(responseBody.status).toBe('error');
    expect(responseBody.message).toContain('Car model id is required');
  });
});
