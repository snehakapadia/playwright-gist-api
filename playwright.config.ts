import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  use: {
    baseURL: 'https://api.github.com',
    storageState: 'auth.json',
    extraHTTPHeaders: {
      'Accept': 'application/vnd.github+json',
      'Authorization': `Bearer ${process.env.TOKEN}`
    }
  },
  globalSetup: require.resolve('./global-setup'),
  reporter: [
    ['list'],  
    ['html', { outputFolder: 'playwright-report', open: 'never' }]  // generate HTML report
  ]
});
