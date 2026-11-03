# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: wardrobe.spec.ts >> StyleMatch E2E Tests >> 1. Application opens successfully
- Location: e2e/wardrobe.spec.ts:5:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.goto: net::ERR_CONNECTION_RESET at http://localhost:8000/
Call log:
  - navigating to "http://localhost:8000/", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('StyleMatch E2E Tests', () => {
  4  | 
  5  |   test('1. Application opens successfully', async ({ page }) => {
> 6  |     await page.goto('/');
     |                ^ Error: page.goto: net::ERR_CONNECTION_RESET at http://localhost:8000/
  7  |     await expect(page).toHaveTitle(/StyleMatch/i);
  8  |     await expect(page.getByText('Recently added')).toBeVisible();
  9  |   });
  10 | 
  11 |   test('2. User can open My Wardrobe', async ({ page }) => {
  12 |     await page.goto('/');
  13 |     await page.getByRole('button', { name: /My Wardrobe/i }).click();
  14 |     await expect(page.getByRole('heading', { name: /My wardrobe/i })).toBeVisible();
  15 |     await expect(page.getByRole('button', { name: /Add a piece/i })).toBeVisible();
  16 |   });
  17 | 
  18 |   test('3. User can add clothing', async ({ page }) => {
  19 |     await page.goto('/');
  20 |     await page.getByRole('button', { name: /My Wardrobe/i }).click();
  21 |     await page.getByRole('button', { name: /Add a piece/i }).click();
  22 | 
  23 |     const itemName = `E2E Shirt ${Date.now()}`;
  24 | 
  25 |     await page.getByPlaceholder('e.g. Linen white shirt').fill(itemName);
  26 |     await page.getByLabel('CATEGORY').selectOption('top');
  27 |     await page.getByPlaceholder('e.g. Ivory').fill('White');
  28 | 
  29 |     await page.getByRole('button', { name: /Add to wardrobe/i }).click();
  30 | 
  31 |     await expect(page.getByText(itemName)).toBeVisible();
  32 |   });
  33 | 
  34 |   test('4. User can delete clothing', async ({ page }) => {
  35 |     await page.goto('/');
  36 |     await page.getByRole('button', { name: /My Wardrobe/i }).click();
  37 |     await page.getByRole('button', { name: /Add a piece/i }).click();
  38 | 
  39 |     const itemName = `E2E Delete ${Date.now()}`;
  40 | 
  41 |     await page.getByPlaceholder('e.g. Linen white shirt').fill(itemName);
  42 |     await page.getByLabel('CATEGORY').selectOption('top');
  43 |     await page.getByPlaceholder('e.g. Ivory').fill('Black');
  44 |     await page.getByRole('button', { name: /Add to wardrobe/i }).click();
  45 | 
  46 |     await expect(page.getByText(itemName)).toBeVisible();
  47 | 
  48 |     page.on('dialog', dialog => dialog.accept());
  49 | 
  50 |     await page.getByRole('button', { name: `Delete ${itemName}` }).click();
  51 | 
  52 |     await expect(page.getByText(itemName)).not.toBeVisible();
  53 |   });
  54 | 
  55 |   test('5. User can open Outfit Studio', async ({ page }) => {
  56 |     await page.goto('/');
  57 |     await page.getByRole('button', { name: /Outfit Studio/i }).click();
  58 | 
  59 |     await expect(page.getByRole('heading', { name: /Outfit studio/i })).toBeVisible();
  60 |     await expect(page.getByText('Choose your pieces')).toBeVisible();
  61 |   });
  62 | 
  63 |   test('6. User can open Style Ideas', async ({ page }) => {
  64 |     await page.goto('/');
  65 |     await page.getByRole('button', { name: /Style Ideas/i }).click();
  66 | 
  67 |     await expect(page.getByRole('heading', { name: /Style ideas/i })).toBeVisible();
  68 |     await expect(page.getByRole('button', { name: /Generate looks/i })).toBeVisible();
  69 |   });
  70 | 
  71 | });
  72 | 
```