import { test, expect } from '@playwright/test';

test.describe('StyleMatch E2E Tests', () => {

  test('1. Application opens successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/StyleMatch/i);
    await expect(page.getByText('Recently added')).toBeVisible();
  });

  test('2. User can open My Wardrobe', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /My Wardrobe/i }).click();
    await expect(page.getByRole('heading', { name: /My wardrobe/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Add a piece/i })).toBeVisible();
  });

  test('3. User can add clothing', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /My Wardrobe/i }).click();
    await page.getByRole('button', { name: /Add a piece/i }).click();

    const itemName = `E2E Shirt ${Date.now()}`;

    await page.getByPlaceholder('e.g. Linen white shirt').fill(itemName);
    await page.getByLabel('CATEGORY').selectOption('top');
    await page.getByPlaceholder('e.g. Ivory').fill('White');

    await page.getByRole('button', { name: /Add to wardrobe/i }).click();

    await expect(page.getByText(itemName)).toBeVisible();
  });

  test('4. User can delete clothing', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /My Wardrobe/i }).click();
    await page.getByRole('button', { name: /Add a piece/i }).click();

    const itemName = `E2E Delete ${Date.now()}`;

    await page.getByPlaceholder('e.g. Linen white shirt').fill(itemName);
    await page.getByLabel('CATEGORY').selectOption('top');
    await page.getByPlaceholder('e.g. Ivory').fill('Black');
    await page.getByRole('button', { name: /Add to wardrobe/i }).click();

    await expect(page.getByText(itemName)).toBeVisible();

    page.on('dialog', dialog => dialog.accept());

    await page.getByRole('button', { name: `Delete ${itemName}` }).click();

    await expect(page.getByText(itemName)).not.toBeVisible();
  });

  test('5. User can open Outfit Studio', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /Outfit Studio/i }).click();

    await expect(page.getByRole('heading', { name: /Outfit studio/i })).toBeVisible();
    await expect(page.getByText('Choose your pieces')).toBeVisible();
  });

  test('6. User can open Style Ideas', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /Style Ideas/i }).click();

    await expect(page.getByRole('heading', { name: /Style ideas/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Generate looks/i })).toBeVisible();
  });

});
