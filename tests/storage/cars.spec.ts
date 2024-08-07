import test from "@playwright/test";
import { GaragePage } from "../../src/pages/GaragePage";

test.describe('Check storage', async()=> {
    test('Create car', async ({page})=> {
        const garagePage = new GaragePage(page);
        await garagePage.navigate();
        await garagePage.addCar('Audi', 'TT', 1234);
        await page.pause();
    })

})