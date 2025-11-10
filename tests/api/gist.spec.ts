import { test, expect } from '@playwright/test';

let gistId: string;

test.describe('GitHub Gist API', () => {

  // Create a public Gist with single file
  test('Create a public Gist', async ({ request }) => {
    const token = process.env.TOKEN; // GitHub token
    const response = await request.post('/gists', {
      headers: { Authorization: `Bearer ${token}` },
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
      console.log(`Gist created with ID: ${gistId}`);
    });
  });

  // Create a public Gist with multiple files
  test('Create gist with multiple files', async ({ request }) => {
    const token = process.env.TOKEN; // GitHub token
    const payload = {
      description: 'Multi-file gist',
      public: true,
      files: {
      'file1.txt': { content: 'Content of file 1' },
      'file2.txt': { content: 'Content of file 2' }
      }
    };
    const response = await request.post('/gists', {
      headers: { Authorization: `Bearer ${token}` },
      data: payload
    });
    expect(response.status()).toBe(201);
  });

  // Get the created gist
  test('Get the created Gist', async ({ request }) => {
    const gistId = process.env.GIST_ID; 
    const response = await request.get(`/gists/${gistId}`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.id).toBe(gistId);
    expect(body.files).toBeTruthy();
    console.log(`Gist ${gistId} fetched successfully`);
  });

  // Update gist content
  test('Update the Gist content', async ({ request }) => {
    const token = process.env.TOKEN;
    const gistId = process.env.GIST_ID; 
    const response = await request.patch(`/gists/${gistId}`, {
      headers: { Authorization: `Bearer ${token}` }, 
      data: { 
        files: { 
        'test.txt': { content: 'Updated content' } 
        } 
      }
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.files['test.txt'].content).toBe('Updated content');
    console.log(`Gist ${gistId} updated successfully`);
  });

  // Delete gist (positive + negative)
  test('Delete Gist (positive & negative)', async ({ request }) => {
    const res = await request.delete(`/gists/${gistId}`);
    expect([204, 404]).toContain(res.status());

    const invalid = await request.delete('/gists/invalid_id');
    expect(invalid.status()).toBe(404);
  });

  //List public Gists with since parameter
  test('List public gists with since parameter', async ({ request }) => {
    const res = await request.get('/gists/public', {
    params: { since: '2025-01-01T00:00:00Z' } // simple static date
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);
  });

  //Star postive GIST
  test('Star a gist (positive)', async ({ request }) => {
    const token = process.env.TOKEN; 
    const gistId = process.env.GIST_ID; 
    const response = await request.put(`/gists/${gistId}/star`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      },
    });
    expect(response.status()).toBe(204); 
    console.log(`Gist ${gistId} starred successfully`);
  });

  //List user gist per page
  test('List user gists with per_page', async ({ request }) => {
    const username = process.env.USERNAME;
    const perPage = 5;
    const response = await request.get(`/users/${username}/gists`, {
      params: { per_page: perPage }
    });
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data.length).toBeLessThanOrEqual(perPage);
  });

  //Get commits for a gist and check total
  test('Get commits for a gist and check total', async ({ request }) => {
    const gistId = process.env.GIST_ID_COMMIT;
    const response = await request.get(`/gists/${gistId}/commits`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
    const totalCommits = body.length;
    console.log(`Total commits: ${totalCommits}`);
    expect(totalCommits).toBeGreaterThan(0);
  });

  //Negative test: Fork a non-existing gist
  test('Negative test: Fork a non-existing gist', async ({ request }) => {
    const token = process.env.TOKEN; 
    const invalidGistId = 'invalid_gist_id_123';
    const response = await request.post(`/gists/${invalidGistId}/forks`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json'
      }
    });
    expect(response.status()).toBe(404);
    const body = await response.json();
    console.log('Error message:', body.message);
    expect(body.message).toContain('Not Found');
  });

  // 401 Unauthorized
  test('Check 401 Unauthorized (invalid token)', async ({ request }) => {
    const response = await request.get('/gists', {
      headers: { Authorization: 'Bearer invalid_token' }
    });
    expect(response.status()).toBe(401);
  });

  // 403 or 401 Forbidden
  test('Check 403/401 Forbidden', async ({ request }) => {
    const response = await request.get('/gists', {
      headers: { Authorization: 'Bearer ' }
    });
    expect([401, 403]).toContain(response.status());
  });

  // 422 Validation error
  test('Check 422 validation error for empty file', async ({ request }) => {
    const response = await request.post('/gists', {
      data: { description: 'Invalid gist', public: true, files: { 'bad.txt': { content: '' } } }
    });
    expect([400, 422]).toContain(response.status());
  });
