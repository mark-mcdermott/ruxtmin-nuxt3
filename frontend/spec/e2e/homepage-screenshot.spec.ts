import { test, expect } from '@playwright/test';
import { promises as fs } from 'fs';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

test('homepage visual comparison', async ({ page }) => {
  // Navigate to the page
  await page.goto('http://localhost:3001');

  // Capture the current screenshot
  const screenshotPath = 'spec/e2e/screenshots/current/homepage.png';
  await page.screenshot({ path: screenshotPath });

  // Define the baseline path
  const baselinePath = 'spec/e2e/screenshots/baseline/homepage.png';

  // Check if the baseline image exists
  try {
    await fs.access(baselinePath);

    // Baseline exists, proceed with comparison
    const baselineImage = PNG.sync.read(await fs.readFile(baselinePath));
    const currentImage = PNG.sync.read(await fs.readFile(screenshotPath));

    // Create a diff image
    const { width, height } = baselineImage;
    const diff = new PNG({ width, height });
    const pixelDiffCount = pixelmatch(
      baselineImage.data,
      currentImage.data,
      diff.data,
      width,
      height,
      { threshold: 0.1 }
    );

    // Save the diff image if there are differences
    if (pixelDiffCount > 0) {
      const diffPath = 'spec/e2e/screenshots/diff/homepage-diff.png';
      await fs.writeFile(diffPath, PNG.sync.write(diff));
      console.log(`Difference found! Diff image saved at ${diffPath}`);
    }

    // Assert no differences
    expect(pixelDiffCount).toBe(0);

  } catch (error) {
    // Baseline does not exist, save current screenshot as the baseline
    await fs.mkdir('spec/e2e/screenshots/baseline', { recursive: true });
    await fs.copyFile(screenshotPath, baselinePath);
    console.log('Baseline image not found. Created a new baseline image.');
  }
});