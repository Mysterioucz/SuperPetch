import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto("https://www.thaiticketmajor.com/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/THAITICKETMAJOR/);
});

test('go to main page', async ({ page }) => {
  await page.goto("https://www.thaiticketmajor.com/");

  // Click the main page link.
  await page.locator('a', { hasText: 'หน้าหลัก' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page).toHaveURL('https://www.thaiticketmajor.com/index.html');
});