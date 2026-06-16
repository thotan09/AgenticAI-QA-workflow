import { expect, test } from '@playwright/test';

const SAUCEDEMO_URL = 'https://www.saucedemo.com';
const STANDARD_USER = 'standard_user';
const SECRET_SAUCE = 'secret_sauce';

const INVALID_CREDENTIALS_ERROR = 'Epic sadface: Username and password do not match any user in this service';

test.describe('SauceDemo Checkout - Invalid Login', () => {
  test('shows an error for invalid login credentials', async ({ page }) => {
    await page.goto(SAUCEDEMO_URL);
    const errorBanner = page.locator('[data-test="error"]');

    await page.fill('[data-test="username"]', 'invalid_user');
    await page.fill('[data-test="password"]', 'wrong_password');
    await page.click('[data-test="login-button"]');
    await expect(errorBanner).toContainText(INVALID_CREDENTIALS_ERROR);

    await page.fill('[data-test="username"]', STANDARD_USER);
    await page.fill('[data-test="password"]', 'wrong_password');
    await page.click('[data-test="login-button"]');
    await expect(errorBanner).toContainText(INVALID_CREDENTIALS_ERROR);
  });
});
