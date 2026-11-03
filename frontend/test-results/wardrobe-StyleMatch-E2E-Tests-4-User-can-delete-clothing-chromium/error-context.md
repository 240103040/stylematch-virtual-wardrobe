# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: wardrobe.spec.ts >> StyleMatch E2E Tests >> 4. User can delete clothing
- Location: e2e/wardrobe.spec.ts:34:3

# Error details

```
Error: locator.selectOption: Error: strict mode violation: getByLabel('CATEGORY') resolved to 2 elements:
    1) <select aria-label="Filter by category">…</select> aka getByLabel('Filter by category')
    2) <select>…</select> aka getByLabel('CATEGORYTopBottomShoesAccessoryOuterwear')

Call log:
  - waiting for getByLabel('CATEGORY')

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - complementary [ref=e4]:
    - generic [ref=e5]:
      - text: S
      - generic [ref=e6]: ·
    - generic [ref=e7]:
      - strong [ref=e8]: stylematch
      - generic [ref=e9]: YOUR PERSONAL EDIT
    - generic [ref=e10]: WORKSPACE
    - navigation [ref=e11]:
      - button "Overview" [ref=e12] [cursor=pointer]
      - button "My Wardrobe 4" [ref=e19] [cursor=pointer]:
        - generic [ref=e22]: My Wardrobe
        - generic [ref=e23]: "4"
      - button "Outfit Studio" [ref=e24] [cursor=pointer]
      - button "Style Ideas" [ref=e30] [cursor=pointer]
    - generic [ref=e35]:
      - generic [ref=e36]:
        - text: ✳
        - paragraph [ref=e37]: Wear what you love.
        - generic [ref=e38]: Make more of what you own.
      - generic [ref=e39]:
        - generic [ref=e40]: A
        - generic [ref=e41]:
          - strong [ref=e42]: Your closet
          - generic [ref=e43]: Personal collection
  - main [ref=e44]:
    - generic [ref=e45]:
      - generic [ref=e46]: YOUR SPACE / MY WARDROBE
      - generic [ref=e47]: ✦ YOUR STYLE, YOUR RULES
    - generic [ref=e49]:
      - generic [ref=e50]:
        - text: EVERY PIECE, IN ITS PLACE
        - heading "My wardrobe" [level=1] [ref=e51]
        - paragraph [ref=e52]: A little collection of things that feel like you.
      - button "Add a piece" [ref=e53] [cursor=pointer]
    - generic [ref=e55]:
      - textbox [ref=e60]:
        - /placeholder: Find something in your closet…
      - combobox "Filter by category" [ref=e61]:
        - option "All categories" [selected]
        - option "Top"
        - option "Bottom"
        - option "Shoes"
        - option "Accessory"
        - option "Outerwear"
    - generic [ref=e62]: SHOWING 4 PIECES
    - generic [ref=e63]:
      - article [ref=e64]:
        - generic [ref=e65]:
          - img "Blue jeans" [ref=e66]
          - generic [ref=e67]: Bottom
          - button "Delete Blue jeans" [ref=e68] [cursor=pointer]
        - generic [ref=e72]:
          - generic [ref=e73]:
            - heading "Blue jeans" [level=3] [ref=e74]
            - paragraph [ref=e75]: All Season · иду
          - generic "иду" [ref=e76]
      - article [ref=e77]:
        - generic [ref=e78]:
          - img "bag" [ref=e79]
          - generic [ref=e80]: Accessory
          - button "Delete bag" [ref=e81] [cursor=pointer]
        - generic [ref=e85]:
          - generic [ref=e86]:
            - heading "bag" [level=3] [ref=e87]
            - paragraph [ref=e88]: All Season · red
          - generic "red" [ref=e89]
      - article [ref=e90]:
        - generic [ref=e91]:
          - img "White T-shirt" [ref=e92]
          - generic [ref=e93]: Top
          - button "Delete White T-shirt" [ref=e94] [cursor=pointer]
        - generic [ref=e98]:
          - generic [ref=e99]:
            - heading "White T-shirt" [level=3] [ref=e100]
            - paragraph [ref=e101]: Summer · white
          - generic "white" [ref=e102]
      - article [ref=e103]:
        - generic [ref=e104]:
          - img "сумка" [ref=e105]
          - generic [ref=e106]: Accessory
          - button "Delete сумка" [ref=e107] [cursor=pointer]
        - generic [ref=e111]:
          - generic [ref=e112]:
            - heading "сумка" [level=3] [ref=e113]
            - paragraph [ref=e114]: All Season · ivory
          - generic "ivory" [ref=e115]
    - generic [ref=e116]:
      - generic [ref=e117]:
        - generic [ref=e118]:
          - text: KEPT CLOSE
          - heading "Saved outfits" [level=2] [ref=e119]
        - generic [ref=e120]: 3 LOOKS
      - generic [ref=e121]:
        - generic [ref=e124]:
          - strong [ref=e125]: My new look
          - generic [ref=e126]: 3 pieces · Casual
        - generic [ref=e129]:
          - strong [ref=e130]: My new look
          - generic [ref=e131]: 1 pieces · Casual
        - generic [ref=e134]:
          - strong [ref=e135]: Summer Casual
          - generic [ref=e136]: 1 pieces · Casual
  - generic [ref=e137]:
    - generic [ref=e138]:
      - generic [ref=e139]:
        - text: A NEW FAVORITE
        - heading "Add a piece" [level=2] [ref=e140]
      - button "Close" [ref=e141] [cursor=pointer]: ×
    - generic [ref=e142]:
      - text: ITEM NAME
      - textbox "ITEM NAME" [active] [ref=e143]:
        - /placeholder: e.g. Linen white shirt
        - text: E2E Delete 1793698979872
    - generic [ref=e144]:
      - generic [ref=e145]:
        - text: CATEGORY
        - combobox "CATEGORY" [ref=e146]:
          - option "Top" [selected]
          - option "Bottom"
          - option "Shoes"
          - option "Accessory"
          - option "Outerwear"
      - generic [ref=e147]:
        - text: COLOR
        - textbox "COLOR" [ref=e148]:
          - /placeholder: e.g. Ivory
    - generic [ref=e149]:
      - text: SEASON
      - combobox "SEASON" [ref=e150]:
        - option "Spring"
        - option "Summer"
        - option "Autumn"
        - option "Winter"
        - option "All Season" [selected]
    - generic [ref=e151]:
      - text: OCCASION
      - combobox "OCCASION" [ref=e152]:
        - option "Casual" [selected]
        - option "University"
        - option "Work"
        - option "Formal"
        - option "Party"
    - generic [ref=e153]:
      - text: IMAGE URL
      - generic [ref=e154]: (OPTIONAL)
      - textbox "IMAGE URL (OPTIONAL)" [ref=e155]:
        - /placeholder: https://…
    - generic [ref=e156]:
      - button "Cancel" [ref=e157] [cursor=pointer]
      - button "Add to wardrobe" [ref=e158] [cursor=pointer]
  - contentinfo [ref=e160]:
    - generic [ref=e161]: STYLEMATCH © 2026
    - generic [ref=e162]: CONSIDERED STYLE. CONSCIOUS CLOSET.
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('StyleMatch E2E Tests', () => {
  4  | 
  5  |   test('1. Application opens successfully', async ({ page }) => {
  6  |     await page.goto('/');
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
> 42 |     await page.getByLabel('CATEGORY').selectOption('top');
     |                                       ^ Error: locator.selectOption: Error: strict mode violation: getByLabel('CATEGORY') resolved to 2 elements:
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