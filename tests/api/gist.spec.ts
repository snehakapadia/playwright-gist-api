import { test, expect } from '@playwright/test';

let gistId: string;

test.describe('GitHub Gist API', () => {

  // Create a public Gist
  test('Create a public Gist', async ({ request }) => {
    const response = await request.post('/gists', {
      data: {
        description: 'Playwright Final Gist',
        public: true,
        files: { 'test.txt': { content: 'Initial content' } }
      }
    });
    expect(response.status()).toBe(201);
    const body = await response.json();
    gistId = body.id;
    expect(gistId).toBeTruthy();
  });
});
