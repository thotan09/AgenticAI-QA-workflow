import { expect, test } from '@playwright/test';

const SAUCEDEMO_URL = 'https://www.saucedemo.com';
const STANDARD_USER = 'standard_user';
const SECRET_SAUCE = 'secret_sauce';

async function login(page) {
  await page.goto(SAUCEDEMO_URL);
  await page.fill('[data-test="username"]', STANDARD_USER);
  await page.fill('[data-test="password"]', SECRET_SAUCE);
  await page.click('[data-test="login-button"]');
  await expect(page).toHaveURL(/inventory.html/);
}

test.describe('SauceDemo Checkout - Missing Checkout Info Validations', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('.shopping_cart_link');
    await page.click('[data-test="checkout"]');
    await expect(page).toHaveURL(/checkout-step-one.html/);
  });

  test('shows validation errors for missing checkout information', async ({ page }) => {
    const errorBanner = page.locator('[data-test="error"]');

    // Leave first name blank and verify the first-name validation error.
    await page.fill('[data-test="firstName"]', '');
    await page.fill('[data-test="lastName"]', 'Doe');
    await page.fill('[data-test="postalCode"]', '12345');
    await page.click('[data-test="continue"]');
    await expect(errorBanner).toContainText('Error: First Name is required');

    // Leave last name blank and verify the last-name validation error.
    await page.fill('[data-test="firstName"]', 'John');
    await page.fill('[data-test="lastName"]', '');
    await page.fill('[data-test="postalCode"]', '12345');
    await page.click('[data-test="continue"]');
    await expect(errorBanner).toContainText('Error: Last Name is required');

    // Leave postal code blank and verify the postal-code validation error.
    await page.fill('[data-test="firstName"]', 'John');
    await page.fill('[data-test="lastName"]', 'Doe');
    await page.fill('[data-test="postalCode"]', '');
    await page.click('[data-test="continue"]');
    await expect(errorBanner).toContainText('Error: Postal Code is required');
  });
});
