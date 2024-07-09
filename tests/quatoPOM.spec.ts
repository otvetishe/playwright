import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../src/pages/registrationPage';

const EMAIL_PREFIX = 'aqa';
const generateEmail = () => `${EMAIL_PREFIX}-${Math.random().toString(36).substring(2, 11)}@test.com`;

test.describe('Registration Form', () => {
  let registrationPage: RegistrationPage;

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);
    await registrationPage.goto();
  });

  test('Positive Scenario: Successful registration', async () => {
    await registrationPage.fillName('John');
    await registrationPage.fillLastName('Doe');
    await registrationPage.fillEmail(generateEmail());
    await registrationPage.fillPassword('Password123');
    await registrationPage.fillRepeatPassword('Password123');
    await registrationPage.submit();

    const successMessage = await registrationPage.getSuccessMessage();
    await expect(successMessage).toBeVisible();
  });

  test('Negative Scenario: Empty Name field', async () => {
    await registrationPage.fillName('');
    await registrationPage.fillLastName('Doe');
    await registrationPage.fillEmail(generateEmail());
    await registrationPage.fillPassword('Password123');
    await registrationPage.fillRepeatPassword('Password123');
    await registrationPage.clickOnBody();

    const errorMessage = await registrationPage.getErrorMessage('Name required');
    await expect(errorMessage).toHaveText('Name required');
  });

  test('Negative Scenario: Invalid Email format', async () => {
    await registrationPage.fillName('John');
    await registrationPage.fillLastName('Doe');
    await registrationPage.fillEmail('invalid-email');
    await registrationPage.fillPassword('Password123');
    await registrationPage.fillRepeatPassword('Password123');
    await registrationPage.clickOnBody();

    const errorMessage = await registrationPage.getErrorMessage('Email is incorrect');
    await expect(errorMessage).toHaveText('Email is incorrect');
  });

  test('Negative Scenario: Passwords do not match', async () => {
    await registrationPage.fillName('John');
    await registrationPage.fillLastName('Doe');
    await registrationPage.fillEmail(generateEmail());
    await registrationPage.fillPassword('Password123');
    await registrationPage.fillRepeatPassword('Password321');
    await registrationPage.clickOnBody();

    const errorMessage = await registrationPage.getErrorMessage('Passwords do not match');
    await expect(errorMessage).toHaveText('Passwords do not match');
  });

  test('Negative Scenario: Name too short', async () => {
    await registrationPage.fillName('J');
    await registrationPage.fillLastName('Doe');
    await registrationPage.fillEmail(generateEmail());
    await registrationPage.fillPassword('Password123');
    await registrationPage.fillRepeatPassword('Password123');
    await registrationPage.clickOnBody();

    const errorMessage = await registrationPage.getErrorMessage('Name has to be from 2 to 20 characters long');
    await expect(errorMessage).toHaveText('Name has to be from 2 to 20 characters long');
  });

  test('Negative Scenario: Password missing capital letter', async () => {
    await registrationPage.fillName('John');
    await registrationPage.fillLastName('Doe');
    await registrationPage.fillEmail(generateEmail());
    await registrationPage.fillPassword('password123');
    await registrationPage.fillRepeatPassword('password123');
    await registrationPage.clickOnBody();

    const errorMessage = await registrationPage.getErrorMessage('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    await expect(errorMessage).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
  });
});
