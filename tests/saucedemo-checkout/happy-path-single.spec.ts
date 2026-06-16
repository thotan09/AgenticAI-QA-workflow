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
  await expect(page.locator('.inventory_list')).toBeVisible();
}

test.describe('SauceDemo Checkout - Happy Path Single Item', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('Checkout single item happy path', async ({ page }) => {
    // Add a single product to cart and verify the cart badge increments.
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    // Open cart and verify selected item details.
    await page.click('.shopping_cart_link');
    await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');
    await expect(page.locator('.inventory_item_price')).toHaveText('$29.99');
    await expect(page.locator('[data-test="checkout"]')).toBeVisible();

    // Proceed to checkout and fill the required information.
    await page.click('[data-test="checkout"]');
    await page.fill('[data-test="firstName"]', 'Jane');
    await page.fill('[data-test="lastName"]', 'Doe');
    await page.fill('[data-test="postalCode"]', '94105');
    await page.click('[data-test="continue"]');

    // Wait for checkout overview to load and verify summary values.
    await expect(page).toHaveURL(/checkout-step-two.html/);
    await expect(page.locator('.summary_subtotal_label')).toHaveText('Item total: $29.99');
    await expect(page.locator('.summary_tax_label')).toHaveText('Tax: $2.40');
    await expect(page.locator('.summary_total_label')).toHaveText('Total: $32.39');

    // Finish purchase and verify order confirmation.
    await page.click('[data-test="finish"]');
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
    await expect(page.locator('.complete-text')).toContainText('Your order has been dispatched');
  });
});
