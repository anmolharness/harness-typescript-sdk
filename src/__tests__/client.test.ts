/**
 * HarnessClient tests
 */

import { describe, it, expect, vi } from 'vitest';
import { HarnessClient } from '../client.js';
import { createMockResponse, createMockErrorResponse } from './setup.js';

describe('HarnessClient', () => {
  const config = {
    apiKey: 'test-api-key',
    accountId: 'test-account-id',
    baseUrl: 'https://test.harness.io',
    timeout: 5000,
  };

  it('should initialize with config', () => {
    const client = new HarnessClient(config);
    expect(client.getAccountId()).toBe('test-account-id');
    expect(client.getBaseUrl()).toBe('https://test.harness.io');
  });

  it('should make GET request with proper headers', async () => {
    const client = new HarnessClient(config);
    const mockData = { id: '1', name: 'Test' };
    
    vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockData));

    const result = await client.get('/test-endpoint');

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/ng/api/test-endpoint'),
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          'x-api-key': 'test-api-key',
          'Content-Type': 'application/json',
        }),
      })
    );
    expect(result).toEqual(mockData);
  });

  it('should add accountIdentifier to query params', async () => {
    const client = new HarnessClient(config);
    vi.mocked(fetch).mockResolvedValueOnce(createMockResponse({}));

    await client.get('/test', { orgId: 'my-org' });

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('accountIdentifier=test-account-id'),
      expect.any(Object)
    );
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('orgId=my-org'),
      expect.any(Object)
    );
  });

  it('should make POST request with body', async () => {
    const client = new HarnessClient(config);
    const requestData = { name: 'New Resource' };
    const responseData = { id: '1', ...requestData };

    vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(responseData));

    const result = await client.post('/test', requestData);

    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify(requestData),
      })
    );
    expect(result).toEqual(responseData);
  });

  it('should make YAML POST request', async () => {
    const client = new HarnessClient(config);
    const yaml = 'pipeline:\n  name: test';
    
    vi.mocked(fetch).mockResolvedValueOnce(createMockResponse({ yaml }));

    await client.postYaml('/pipelines', yaml);

    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/yaml',
        }),
        body: yaml,
      })
    );
  });

  it('should handle pipeline API paths correctly', async () => {
    const client = new HarnessClient(config);
    vi.mocked(fetch).mockResolvedValueOnce(createMockResponse({}));

    await client.get('/pipeline/api/pipelines');

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('https://test.harness.io/pipeline/api/pipelines'),
      expect.any(Object)
    );
  });

  it('should unwrap ResponseDTO', async () => {
    const client = new HarnessClient(config);
    const wrappedData = {
      status: 'SUCCESS',
      data: { id: '1', name: 'Test' },
      correlationId: 'abc123',
    };

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => wrappedData,
    } as Response);

    const result = await client.get('/test');
    expect(result).toEqual({ id: '1', name: 'Test' });
  });

  it('should handle 404 errors', async () => {
    const client = new HarnessClient(config);
    
    vi.mocked(fetch).mockResolvedValueOnce(
      createMockErrorResponse(404, 'Resource not found')
    );

    await expect(client.get('/nonexistent')).rejects.toThrow();
  });

  it('should handle 403 permission errors', async () => {
    const client = new HarnessClient(config);
    
    vi.mocked(fetch).mockResolvedValueOnce(
      createMockErrorResponse(403, 'Permission denied')
    );

    await expect(client.get('/forbidden')).rejects.toThrow();
  });

  it('should handle network errors', async () => {
    const client = new HarnessClient(config);
    
    vi.mocked(fetch).mockRejectedValueOnce(new Error('Network error'));

    await expect(client.get('/test')).rejects.toThrow('Network error');
  });

  it('should use default baseUrl if not provided', () => {
    const client = new HarnessClient({
      apiKey: 'key',
      accountId: 'account',
    });

    expect(client.getBaseUrl()).toBe('https://app.harness.io');
  });

  it('should make DELETE request', async () => {
    const client = new HarnessClient(config);
    
    vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(true));

    const result = await client.delete('/test/123');

    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        method: 'DELETE',
      })
    );
    expect(result).toBe(true);
  });

  it('should make PUT request', async () => {
    const client = new HarnessClient(config);
    const updateData = { name: 'Updated' };
    
    vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(updateData));

    const result = await client.put('/test/123', updateData);

    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        method: 'PUT',
        body: JSON.stringify(updateData),
      })
    );
    expect(result).toEqual(updateData);
  });
});
