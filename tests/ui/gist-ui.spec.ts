import { test, expect } from '@playwright/test';
import fs from 'fs';
require('dotenv').config();

const AUTH_FILE = 'auth.json';

test.describe('GitHub Gist UI Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('https://github.com/');
  });

  // Test 1: Create a Gist
  test('Create Gist with description and filename', async ({ page }) => {
    await page.goto('https://gist.github.com/');
    await page.fill('input[name="gist[description]"]', 'Test Gist');
    await page.fill('input[name="gist[contents][][name]"]', 'demo.ts');
    await page.fill('textarea[name="gist[contents][][value]"]', 'console.log("Hello World");');
    await page.click('button:has-text("Create secret gist")', { force: true });
    console.log("Gist created successfully");
  });

  // View your Gists
  test('View your Gists', async ({ page }) => {
    const GITHUB_USER = process.env["USERNAME"]!;
    await page.goto(`https://gist.github.com/${GITHUB_USER}`);
    const gists = page.locator('.gist-snippet');
    await expect(gists.first()).toBeVisible();
    console.log(`Total gists visible for ${GITHUB_USER}: ${await gists.count()}`);
  });
});
