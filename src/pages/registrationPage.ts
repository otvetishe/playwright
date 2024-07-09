import { Page } from '@playwright/test';

export class RegistrationPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://qauto.forstudy.space/');
    await this.page.click('text=Sign up');
  }

  async fillName(name: string) {
    await this.page.fill('input[name="name"]', name);
  }

  async fillLastName(lastName: string) {
    await this.page.fill('input[name="lastName"]', lastName);
  }

  async fillEmail(email: string) {
    await this.page.fill('input[name="email"]', email);
  }

  async fillPassword(password: string) {
    await this.page.fill('input[name="password"]', password);
  }

  async fillRepeatPassword(repeatPassword: string) {
    await this.page.fill('input[name="repeatPassword"]', repeatPassword);
  }

  async submit() {
    await this.page.click('button:has-text("Register")');
  }

  async clickOnBody() {
    await this.page.click('body');
  }

  async getSuccessMessage() {
    return this.page.locator('text=Registration Complete');
  }

  async getErrorMessage(message: string) {
    return this.page.locator(`.invalid-feedback:has-text("${message}")`).first();
  }
}