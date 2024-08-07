import {test as setup} from '@playwright/test'
import { HomePage } from '../../src/pages/HomePage';

    const EMAIL = process.env.APP_USER_EMAIL!;
    const PASS = process.env.APP_USER_PASSWORD!;

setup('Login', async({page})=> {
        const homePage = new HomePage(page);
        await homePage.navigate();
        await homePage.loginAsUser(EMAIL, PASS);
        await page.getByRole('button', {name: 'Add car'}).waitFor();
        await page.context().storageState({path: 'storageState.json'});
})