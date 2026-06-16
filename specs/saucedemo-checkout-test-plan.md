# SauceDemo Checkout Test Plan

## Application Overview

Comprehensive manual-to-automated-friendly test plan for Sauce Demo checkout flows (https://www.saucedemo.com). Covers acceptance criteria AC1-AC5 with organized scenarios: Happy Path, Negative, Edge Cases, Navigation, and UI Validation. Assumes a fresh browser state for each test. Credentials: standard_user / secret_sauce.

## Test Scenarios

### 1. SauceDemo Checkout

**Seed:** `tests/seed.spec.ts`

#### 1.1. Checkout Happy Path - Single Item Purchase

**File:** `specs/saucedemo-checkout-test-plan.md`

**Steps:**
  1. Go to https://www.saucedemo.com and log in with valid credentials (username: standard_user, password: secret_sauce).
    - expect: Login succeeds and inventory page loads showing products.
  2. Add a single product to cart (e.g., Sauce Labs Backpack).
    - expect: Cart badge increments to 1; product shows as added.
  3. Open cart and verify item, then click 'Checkout'.
    - expect: Cart page shows the selected item with correct name and price. Checkout button is visible.
  4. On Checkout: Your Information page, enter valid first name, last name, and postal code, then continue.
    - expect: Checkout Overview page loads showing item subtotal, tax, and total.
  5. Click 'Finish' to complete purchase.
    - expect: Order confirmation page displays 'THANK YOU FOR YOUR ORDER' and shows order completion message.

#### 1.2. Checkout Happy Path - Multiple Items Purchase

**File:** `specs/saucedemo-checkout-test-plan.md`

**Steps:**
  1. Log in with valid credentials.
    - expect: Inventory page loads.
  2. Add multiple products (2-3) from different categories to cart.
    - expect: Cart badge increments appropriately; each product added appears in cart.
  3. Proceed to cart, verify items and quantities, then checkout and fill required info.
    - expect: Checkout Overview displays all items, correct quantities, subtotal, tax, and total.
  4. Finish purchase.
    - expect: Order confirmation page displays success message and summary link/button.

#### 1.3. Negative - Invalid Login Credentials

**File:** `specs/saucedemo-checkout-test-plan.md`

**Steps:**
  1. Navigate to login page and attempt login with invalid username and/or password.
    - expect: Login fails and an error message appears (e.g., 'Epic sadface: Username and password do not match any user in this service').

#### 1.4. Negative - Missing Checkout Information

**File:** `specs/saucedemo-checkout-test-plan.md`

**Steps:**
  1. Add an item to cart and go to checkout.
    - expect: Checkout: Your Information page is visible.
  2. Leave first name blank, fill other fields, and attempt to continue.
    - expect: Validation error shown (e.g., 'Error: First Name is required').
  3. Repeat for last name and postal code being blank.
    - expect: Corresponding validation errors display for each missing field.

#### 1.5. Negative - Attempt Checkout with Empty Cart

**File:** `specs/saucedemo-checkout-test-plan.md`

**Steps:**
  1. Log in but do not add items to cart. Attempt to navigate directly to /checkout-step-one.html.
    - expect: App redirects to inventory or shows empty cart behavior; checkout cannot proceed without items.

#### 1.6. Edge Case - Price and Total Calculation Accuracy

**File:** `specs/saucedemo-checkout-test-plan.md`

**Steps:**
  1. Add items with known prices (recorded) to cart (e.g., Backpack $29.99, Bike Light $9.99).
    - expect: Checkout Overview displays correct item prices.
  2. Verify subtotal equals sum of item prices, tax is calculated (tax rate as displayed), and total equals subtotal+tax.
    - expect: Displayed subtotal, tax, and total match computed values within rounding tolerances.

#### 1.7. Edge Case - Large Number of Items

**File:** `specs/saucedemo-checkout-test-plan.md`

**Steps:**
  1. Add all available items to cart (maximizing cart size).
    - expect: Cart badge shows correct count; cart and checkout pages remain usable and display all items.
  2. Proceed through checkout and finish.
    - expect: Order completes successfully and confirmation displays.

#### 1.8. Navigation - Back Button Behavior during Checkout

**File:** `specs/saucedemo-checkout-test-plan.md`

**Steps:**
  1. Add item(s) and navigate to Checkout: Your Information page.
    - expect: Page visible.
  2. Click browser back button to return to Cart, then forward to Checkout, then refresh.
    - expect: State preserves cart contents; checkout progress behaves consistently and does not duplicate orders.

#### 1.9. Navigation - Continue Shopping link/button

**File:** `specs/saucedemo-checkout-test-plan.md`

**Steps:**
  1. From the Cart page, click 'Continue Shopping'.
    - expect: User navigates back to Inventory page and items remain in cart.

#### 1.10. UI Validation - Buttons and Labels Present

**File:** `specs/saucedemo-checkout-test-plan.md`

**Steps:**
  1. Log in and inspect Inventory, Cart, and Checkout pages.
    - expect: All primary buttons (Add to cart, Remove, Cart, Checkout, Continue, Finish) and labels are visible and correctly labeled; accessibility attributes present where applicable.

#### 1.11. UI Validation - Responsive Layout

**File:** `specs/saucedemo-checkout-test-plan.md`

**Steps:**
  1. Resize viewport to mobile (375x812) and tablet widths.
    - expect: Inventory, Cart, and Checkout pages remain usable; product cards and buttons adapt without overlap.

#### 1.12. UI Validation - Error Message Styling and Focus

**File:** `specs/saucedemo-checkout-test-plan.md`

**Steps:**
  1. Trigger a validation error on Checkout: Your Information page (e.g., leave First Name blank)
    - expect: Error message is displayed prominently, keyboard focus moves to the error or the first invalid field, and message accessible to screen readers.
