import { test, expect } from '@playwright/test';

test('Create Gist with description, filename', async ({ page }) => {
  // Go to GitHub login
  await page.goto('https://github.com/login');
  await page.fill('input[name="login"]', process.env["GITHUB_USERNAME"]!);
  await page.fill('input[name="password"]', process.env["GITHUB_PASSWORD"]!);
  await page.click('input[name="commit"]');
  await page.waitForURL('https://github.com/');

  // Navigate to Gist creation page
  await page.goto('https://gist.github.com/');

  await page.fill('input[name="gist[description]"]', 'Test Gist');
  await page.fill('input[name="gist[contents][][name]"]', 'demo.ts');
  await page.fill('textarea[name="gist[contents][][value]"]', 'console.log("Hello World");');

  // Click Create Public Gist
  await page.isVisible('button:has-text("Create secret gist")');
  await page.click('button:has-text("Create secret gist")', { force: true });
  console.log("Gist craeted")
});

test('View your Gists', async ({ page }) => {
  //  Log in to GitHub
  await page.goto('https://github.com/login');
  await page.fill('input[name="login"]', process.env["GITHUB_USERNAME"]!);
  await page.fill('input[name="password"]', process.env["GITHUB_PASSWORD"]!);
  await page.click('input[name="commit"]');
  await page.waitForURL('https://github.com/');

  // Navigate to your Gists page
  const GITHUB_USER = process.env["GITHUB_USERNAME"]!;
  await page.goto(`https://gist.github.com/${GITHUB_USER}`);

  // Validate that at least one Gist is visible
  const gists = page.locator('.gist-snippet'); // GitHub lists gists with this class
  await expect(gists.first()).toBeVisible();

  // count the total number of gists visible on first page
  const count = await gists.count();
  console.log(`Total gists visible for ${GITHUB_USER}: ${count}`);
});






