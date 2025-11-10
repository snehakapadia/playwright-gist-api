import { chromium, FullConfig } from '@playwright/test';
import fs from 'fs';
require('dotenv').config();

const AUTH_FILE = 'auth.json';

async function globalSetup(config: FullConfig) {
  if (!fs.existsSync(AUTH_FILE)) {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://github.com/login');
    await page.fill('input[name="login"]', process.env["USERNAME"]!);
    await page.fill('input[name="password"]', process.env["PASSWORD"]!);
    await page.click('input[name="commit"]');
    await page.waitForURL('https://github.com/');

    await context.storageState({ path: AUTH_FILE });
    console.log('Auth state saved to auth.json');
    await browser.close();
  } else {
    console.log('Auth.json already exists, skipping login');
  }
}

export default globalSetup;
