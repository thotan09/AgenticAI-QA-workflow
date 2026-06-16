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

test.describe('SauceDemo Checkout - Happy Path Multiple Items', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('Checkout multiple items happy path', async ({ page }) => {
    // Add multiple products to the cart and verify the cart badge count.
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
    await page.click('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');
    await expect(page.locator('.shopping_cart_badge')).toHaveText('3');

    // Open cart and verify each selected item and price.
    await page.click('.shopping_cart_link');
    const cartItems = page.locator('.cart_item');
    await expect(cartItems).toHaveCount(3);
    await expect(page.locator('.inventory_item_name', { hasText: 'Sauce Labs Backpack' })).toBeVisible();
    await expect(page.locator('.inventory_item_name', { hasText: 'Sauce Labs Bike Light' })).toBeVisible();
    await expect(page.locator('.inventory_item_name', { hasText: 'Sauce Labs Bolt T-Shirt' })).toBeVisible();
    await expect(page.locator('.inventory_item_price', { hasText: '$29.99' })).toHaveCount(1);
    await expect(page.locator('.inventory_item_price', { hasText: '$9.99' })).toHaveCount(1);
    await expect(page.locator('.inventory_item_price', { hasText: '$15.99' })).toHaveCount(1);

    // Proceed through checkout flow.
    await page.click('[data-test="checkout"]');
    await page.fill('[data-test="firstName"]', 'Alice');
    await page.fill('[data-test="lastName"]', 'Smith');
    await page.fill('[data-test="postalCode"]', '10001');
    await page.click('[data-test="continue"]');

    await expect(page).toHaveURL(/checkout-step-two.html/);
    await expect(page.locator('.summary_subtotal_label')).toHaveText('Item total: $55.97');
    await expect(page.locator('.summary_tax_label')).toHaveText('Tax: $4.48');
    await expect(page.locator('.summary_total_label')).toHaveText('Total: $60.45');

    // Complete the purchase and verify confirmation.
    await page.click('[data-test="finish"]');
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
    await expect(page.locator('.complete-text')).toContainText('Your order has been dispatched');
  });
});
