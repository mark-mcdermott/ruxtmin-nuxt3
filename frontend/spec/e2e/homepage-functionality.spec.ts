import { test, expect } from '@playwright/test';

test('get started link', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading').filter({ hasText: 'There was a wall.'})).toBeVisible()
  await expect(page.getByRole('heading').filter({ hasText: 'It did not look important.'})).toBeVisible()
  await expect(page.getByRole('paragraph').filter({ hasText: '{"status":"OK"}'})).toBeVisible()
  await expect(page.getByRole('link').filter({ hasText: 'Log in'})).toBeVisible()
});