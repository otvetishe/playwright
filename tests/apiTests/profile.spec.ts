
import { test, expect } from '@playwright/test';

test('should replace profile data and verify UI', async ({ page }) => {
  await page.route('**/api/users/profile', route => {
    const mockedResponse = {
        "status": "ok",
        "data": {
            "userId": 130596,
            "photoFilename": "default-user.png",
            "name": "John",
            "lastName": "Doe"
        }
    };

    route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify(mockedResponse)
    });
  });

  await page.goto('https://qauto.forstudy.space/panel/profile');

  const userName = await page.locator('.profile_name.display-4').textContent();

  expect(userName).toBe('John Doe');
});
