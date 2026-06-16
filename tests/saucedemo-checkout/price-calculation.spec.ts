import { expect, test } from '@playwright/test';

const SAUCEDEMO_URL = 'https://www.saucedemo.com';
const STANDARD_USER = 'standard_user';
const SECRET_SAUCE = 'secret_sauce';

function parseDollarAmount(label) {
  return Number(label?.replace(/[^0-9.]/g, '') ?? '0');
}

async function login(page) {
  await page.goto(SAUCEDEMO_URL);
  await page.fill('[data-test="username"]', STANDARD_USER);
  await page.fill('[data-test="password"]', SECRET_SAUCE);
  await page.click('[data-test="login-button"]');
  await expect(page).toHaveURL(/inventory.html/);
}

test.describe('SauceDemo Checkout - Price and Total Calculation Verification', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('verifies item prices, subtotal, tax, and total on checkout overview', async ({ page }) => {
    // Add known-price products to cart.
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');

    // Proceed through cart to checkout overview.
    await page.click('.shopping_cart_link');
    await page.click('[data-test="checkout"]');
    await page.fill('[data-test="firstName"]', 'Sam');
    await page.fill('[data-test="lastName"]', 'Taylor');
    await page.fill('[data-test="postalCode"]', '90210');
    await page.click('[data-test="continue"]');
    await expect(page).toHaveURL(/checkout-step-two.html/);

    // Verify item prices on the overview page.
    await expect(page.locator('.inventory_item_price', { hasText: '$29.99' })).toHaveCount(1);
    await expect(page.locator('.inventory_item_price', { hasText: '$9.99' })).toHaveCount(1);

    // Parse displayed subtotal, tax, and total values.
    const subtotalText = await page.locator('.summary_subtotal_label').textContent();
    const taxText = await page.locator('.summary_tax_label').textContent();
    const totalText = await page.locator('.summary_total_label').textContent();

    const subtotal = parseDollarAmount(subtotalText);
    const tax = parseDollarAmount(taxText);
    const total = parseDollarAmount(totalText);

    const expectedSubtotal = 29.99 + 9.99;
    const expectedTax = Number((expectedSubtotal * 0.08).toFixed(2));
    const expectedTotal = Number((expectedSubtotal + expectedTax).toFixed(2));

    await expect(subtotal).toBeCloseTo(expectedSubtotal, 2);
    await expect(tax).toBeCloseTo(expectedTax, 2);
    await expect(total).toBeCloseTo(expectedTotal, 2);
    await expect(total).toBe(expectedTotal);
  });
});
