import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { SignInModal } from './components/SignInModal';

export class HomePage extends BasePage { 

  protected readonly _header: Locator
  protected readonly _signInBtn: Locator
  protected readonly _signInPopUp: SignInModal

  constructor(page: Page){
    super(page, '/');
    this._header = this._page.locator('.header');
    this._signInBtn  = this._header.getByRole('button', {name: 'Sign in'});
    this._signInPopUp = new SignInModal(this._page);
  }

  async loginAsUser(login: string, pass: string){
    await this._signInBtn.click()
    await this._signInPopUp.login(login, pass);
  }

  get header(){
    return this._header
  }
}