import { test, expect } from '@playwright/test';

const BASE_URL = 'https://qauto.forstudy.space/';
const EMAIL_PREFIX = 'aqa';
const generateEmail = () => `${EMAIL_PREFIX}-${Math.random().toString(36).substring(2, 11)}@test.com`;

test.describe('Registration Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await page.click('text=Sign up');
  });

  test('Positive Scenario: Successful registration', async ({ page }) => {
    await page.fill('input[name="name"]', 'John');
    await page.fill('input[name="lastName"]', 'Doe');
    await page.fill('input[name="email"]', generateEmail());
    await page.fill('input[name="password"]', 'Password123');
    await page.fill('input[name="repeatPassword"]', 'Password123');
    await page.click('button:has-text("Register")');

    const successMessage = await page.locator('text=Registration Complete');
    await expect(successMessage).toBeVisible();
  });

  test('Negative Scenario: Empty Name field', async ({ page }) => {
    await page.click('input[name="name"]');
    await page.click('text=Name');
    await page.fill('input[name="lastName"]', 'Doe');
    await page.fill('input[name="email"]', generateEmail());
    await page.fill('input[name="password"]', 'Password123');
    await page.fill('input[name="repeatPassword"]', 'Password123');

    const errorMessage = await page.locator('text=Name required');
    await expect(errorMessage).toBeVisible();
  });

  test('Negative Scenario: Invalid Email format', async ({ page }) => {
    await page.fill('input[name="name"]', 'John');
    await page.fill('input[name="lastName"]', 'Doe');
    await page.fill('input[name="email"]', 'invalid-email');
    await page.click('text=Email');
    await page.fill('input[name="password"]', 'Password123');
    await page.fill('input[name="repeatPassword"]', 'Password123');

    const errorMessage = await page.locator('text=Email is incorrect');
    await expect(errorMessage).toBeVisible();
  });

  test('Negative Scenario: Passwords do not match', async ({ page }) => {
    await page.fill('input[name="name"]', 'John');
    await page.fill('input[name="lastName"]', 'Doe');
    await page.fill('input[name="email"]', generateEmail());
    await page.fill('input[name="password"]', 'Password123');
    await page.fill('input[name="repeatPassword"]', 'Password321');
    await page.click('text=Email');

    const errorMessage = await page.locator('text=Passwords do not match');
    await expect(errorMessage).toBeVisible();
  });

  test('Negative Scenario: Name too short', async ({ page }) => {
    await page.fill('input[name="name"]', 'J');
    await page.fill('input[name="lastName"]', 'Doe');
    await page.fill('input[name="email"]', generateEmail());
    await page.fill('input[name="password"]', 'Password123');
    await page.fill('input[name="repeatPassword"]', 'Password123');
    await page.click('text=Email');

    const errorMessage = await page.locator('text=Name has to be from 2 to 20 characters long');
    await expect(errorMessage).toBeVisible();
  });

  test('Negative Scenario: Password missing capital letter', async ({ page }) => {
    await page.fill('input[name="name"]', 'John');
    await page.fill('input[name="lastName"]', 'Doe');
    await page.fill('input[name="email"]', generateEmail());
    await page.fill('input[name="password"]', 'password123');
    await page.fill('input[name="repeatPassword"]', 'password123');

    const errorMessage = await page.locator('text=Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    await expect(errorMessage).toBeVisible();
  });
});
 