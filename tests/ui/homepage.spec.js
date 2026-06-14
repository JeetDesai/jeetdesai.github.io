const { test, expect, devices } = require('@playwright/test');

test.describe('homepage UI', () => {
  test('renders the key homepage sections', async ({ page }) => {
    await page.goto('/');

    await expect(
      page.getByRole('heading', {
        name: /building intelligent systems that automate, scale & drive business impact/i,
      })
    ).toBeVisible();

    await expect(page.getByRole('link', { name: /view case studies/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /download resume/i })).toBeVisible();
    await expect(page.getByText(/problems i solve/i)).toBeVisible();
    await expect(page.getByText(/impact delivered/i)).toBeVisible();
    await expect(page.getByText(/featured case studies/i)).toBeVisible();
    await expect(page.getByText(/latest insights/i)).toBeVisible();
    await expect(page.getByText(/tech stack & tools/i)).toBeVisible();
  });

  test('captures a desktop full-page homepage screenshot', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 2200 });
    await page.goto('/');
    await page.screenshot({
      path: 'test-results/homepage-desktop-full.png',
      fullPage: true,
    });
  });

  test('keeps homepage CTA visible on mobile', async ({ browser }) => {
    const context = await browser.newContext({
      ...devices['iPhone 13'],
    });
    const page = await context.newPage();

    await page.goto('/');

    await expect(page.getByRole('link', { name: /view case studies/i }).first()).toBeVisible();
    await expect(page.getByText(/worked with amazing teams/i)).toBeVisible();

    await context.close();
  });
});
