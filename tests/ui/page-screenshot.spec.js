const { test, expect } = require('@playwright/test');

const targetUrl = process.env.SCREENSHOT_TARGET_URL || '/';
const screenshotPath = process.env.SCREENSHOT_OUTPUT_PATH || 'test-results/page-screenshot.png';
const viewportWidth = Number(process.env.SCREENSHOT_VIEWPORT_WIDTH || 1440);
const viewportHeight = Number(process.env.SCREENSHOT_VIEWPORT_HEIGHT || 2200);
const waitForSelector = process.env.SCREENSHOT_WAIT_FOR_SELECTOR;
const fullPage = process.env.SCREENSHOT_FULL_PAGE !== 'false';

test('captures a configurable full-page screenshot', async ({ page }) => {
  await page.setViewportSize({
    width: viewportWidth,
    height: viewportHeight,
  });

  const response = await page.goto(targetUrl, { waitUntil: 'networkidle' });
  expect(response && response.ok()).toBeTruthy();

  if (waitForSelector) {
    await page.locator(waitForSelector).first().waitFor({ state: 'visible' });
  }

  await page.screenshot({
    path: screenshotPath,
    fullPage,
  });
});
