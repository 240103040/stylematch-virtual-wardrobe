# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: wardrobe.spec.ts >> StyleMatch E2E Tests >> 3. User can add clothing
- Location: e2e/wardrobe.spec.ts:18:3

# Error details

```
Error: locator.click: Error: strict mode violation: getByRole('button', { name: /My Wardrobe/i }) resolved to 2 elements:
    1) <button class="nav-link ">…</button> aka getByRole('button', { name: 'My Wardrobe 4' })
    2) <button class="primary-button">…</button> aka getByRole('button', { name: 'Explore my wardrobe ↗' })

Call log:
  - waiting for getByRole('button', { name: /My Wardrobe/i })

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
      - generic [ref=e46]: YOUR SPACE / OVERVIEW
      - generic [ref=e47]: ✦ YOUR STYLE, YOUR RULES
    - generic [ref=e49]:
      - generic [ref=e50]:
        - text: THE ART OF GETTING DRESSED
        - heading [level=1] [ref=e51]:
          - text: Less wondering.
          - emphasis [ref=e52]: More wearing.
        - paragraph [ref=e53]: Your wardrobe, thoughtfully organized. Find new ways to wear the pieces you already love.
        - button "Explore my wardrobe ↗" [ref=e54] [cursor=pointer]:
          - text: Explore my wardrobe
          - generic [ref=e55]: ↗
      - generic [ref=e56]:
        - img "Editorial fashion styling" [ref=e57]
        - generic [ref=e58]:
          - generic [ref=e59]: STYLE NOTE 01
          - strong [ref=e60]: Good style startswith what you own.
      - generic [ref=e61]: 01 / EDIT
    - generic [ref=e62]:
      - generic [ref=e63]:
        - generic [ref=e64]: YOUR PIECES
        - strong [ref=e67]: "04"
        - generic [ref=e68]: Pieces in your collection
      - generic [ref=e69]:
        - generic [ref=e70]: YOUR OUTFITS
        - strong [ref=e75]: "03"
        - generic [ref=e76]: Looks saved for later
      - generic [ref=e77]:
        - generic [ref=e78]: A LITTLE INSPIRATION
        - strong [ref=e82]: ∞
        - generic [ref=e83]: New ways to wear your pieces
    - generic [ref=e84]:
      - generic [ref=e85]:
        - generic [ref=e86]:
          - text: CURATED FOR YOU
          - heading "Recently added" [level=2] [ref=e87]
        - button "View all pieces ↗" [ref=e88] [cursor=pointer]
      - generic [ref=e89]:
        - article [ref=e90]:
          - generic [ref=e91]:
            - img "Blue jeans" [ref=e92]
            - generic [ref=e93]: Bottom
            - button "Delete Blue jeans" [ref=e94] [cursor=pointer]
          - generic [ref=e98]:
            - generic [ref=e99]:
              - heading "Blue jeans" [level=3] [ref=e100]
              - paragraph [ref=e101]: All Season · иду
            - generic "иду" [ref=e102]
        - article [ref=e103]:
          - generic [ref=e104]:
            - img "bag" [ref=e105]
            - generic [ref=e106]: Accessory
            - button "Delete bag" [ref=e107] [cursor=pointer]
          - generic [ref=e111]:
            - generic [ref=e112]:
              - heading "bag" [level=3] [ref=e113]
              - paragraph [ref=e114]: All Season · red
            - generic "red" [ref=e115]
        - article [ref=e116]:
          - generic [ref=e117]:
            - img "White T-shirt" [ref=e118]
            - generic [ref=e119]: Top
            - button "Delete White T-shirt" [ref=e120] [cursor=pointer]
          - generic [ref=e124]:
            - generic [ref=e125]:
              - heading "White T-shirt" [level=3] [ref=e126]
              - paragraph [ref=e127]: Summer · white
            - generic "white" [ref=e128]
        - article [ref=e129]:
          - generic [ref=e130]:
            - img "сумка" [ref=e131]
            - generic [ref=e132]: Accessory
            - button "Delete сумка" [ref=e133] [cursor=pointer]
          - generic [ref=e137]:
            - generic [ref=e138]:
              - heading "сумка" [level=3] [ref=e139]
              - paragraph [ref=e140]: All Season · ivory
            - generic "ivory" [ref=e141]
    - generic [ref=e142]:
      - generic [ref=e143]:
        - generic [ref=e144]:
          - text: KEPT CLOSE
          - heading "Saved outfits" [level=2] [ref=e145]
        - generic [ref=e146]: 3 LOOKS
      - generic [ref=e147]:
        - generic [ref=e150]:
          - strong [ref=e151]: My new look
          - generic [ref=e152]: 3 pieces · Casual
        - generic [ref=e155]:
          - strong [ref=e156]: My new look
          - generic [ref=e157]: 1 pieces · Casual
        - generic [ref=e160]:
          - strong [ref=e161]: Summer Casual
          - generic [ref=e162]: 1 pieces · Casual
  - contentinfo [ref=e163]:
    - generic [ref=e164]: STYLEMATCH © 2026
    - generic [ref=e165]: CONSIDERED STYLE. CONSCIOUS CLOSET.
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
> 20 |     await page.getByRole('button', { name: /My Wardrobe/i }).click();
     |                                                              ^ Error: locator.click: Error: strict mode violation: getByRole('button', { name: /My Wardrobe/i }) resolved to 2 elements:
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