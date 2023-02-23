// Import the necessary functions from Playwright test library.
import { test, expect } from '@playwright/test';

// Define the test function.
test('test', async ({ page }) => {

  // Navigate to the homepage.
  await page.goto('http://localhost:3000/');

  // Reload the page.
  await page.reload();

  // Check that the page contains an h4 element with the text "Products".
  await expect(page.locator('h4')).toContainText('Products');

  // Check that the page contains 27 ".MuiGrid-item" elements.
  await expect(page.locator('.MuiGrid-item')).toHaveCount(27);

  // Click the "Add to cart" button twice on the first product.
  await page.locator('div').getByRole('button', { name: 'Add to cart' }).first().click();
  await page.locator('div').getByRole('button', { name: 'Add to cart' }).first().click();

  // Click the "View mode light" button.
  await page.getByRole('button', { name: 'View mode light' }).click();

  // Check that the page contains one "[aria-label='View mode dark']" element.
  await expect(page.locator('[aria-label="View mode dark"]')).toHaveCount(1);

  // Click the "View mode dark" button.
  await page.getByRole('button', { name: 'View mode dark' }).click();

  // Check that the page contains one "[aria-label='View mode light']" element.
  await expect(page.locator('[aria-label="View mode light"]')).toHaveCount(1);

  // Click the "show cart count" button.
  await page.getByRole('button', { name: 'show cart count' }).click();

  // Check that the page contains one "[aria-label='Increase quantity']" element.
  await expect(page.locator('[aria-label="Increase quantity"]')).toHaveCount(1);

  // Check that the page contains a span with class "MuiBadge-badge" and the text "2".
  await expect(page.locator('span.MuiBadge-badge')).toContainText('2');

  // Click the "Increase quantity" button three times.
  await page.getByRole('button', { name: 'Increase quantity' }).click();
  await page.getByRole('button', { name: 'Increase quantity' }).click();
  await page.getByRole('button', { name: 'Increase quantity' }).click();

  // Click the "Decrease quantity" button.
  await page.getByRole('button', { name: 'Decrease quantity' }).click();

  // Check that the page contains a span with class "MuiBadge-badge" and the text "4".
  await expect(page.locator('span.MuiBadge-badge')).toContainText('4');
});
