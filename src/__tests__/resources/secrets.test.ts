/**
 * SecretsAPI tests
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { HarnessClient } from '../../client.js';
import { SecretsAPI } from '../../resources/secrets.js';
import { createMockResponse } from '../setup.js';
import type { Secret } from '../../types/secret.js';

describe('SecretsAPI', () => {
  let client: HarnessClient;
  let api: SecretsAPI;

  beforeEach(() => {
    client = new HarnessClient({
      apiKey: 'test-key',
      accountId: 'test-account',
    });
    api = new SecretsAPI(client);
  });

  it('should list secrets', async () => {
    const mockSecrets: Secret[] = [
      {
        identifier: 'secret1',
        orgIdentifier: 'org1',
        projectIdentifier: 'proj1',
        name: 'Secret 1',
        type: 'SecretText',
      },
    ];

    vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockSecrets));

    const result = await api.list('org1', 'proj1');

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/ng/api/v2/secrets'),
      expect.any(Object)
    );
    expect(result).toEqual(mockSecrets);
  });

  it('should get secret', async () => {
    const mockSecret: Secret = {
      identifier: 'secret1',
      orgIdentifier: 'org1',
      projectIdentifier: 'proj1',
      name: 'Secret 1',
      type: 'SecretText',
    };

    vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockSecret));

    const result = await api.get('secret1', 'org1', 'proj1');

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/ng/api/v2/secrets/secret1'),
      expect.any(Object)
    );
    expect(result).toEqual(mockSecret);
  });

  it('should create secret', async () => {
    const createData = {
      identifier: 'new-secret',
      orgIdentifier: 'org1',
      projectIdentifier: 'proj1',
      name: 'New Secret',
      type: 'SecretText' as const,
      spec: {
        secretManagerIdentifier: 'harnessSecretManager',
        valueType: 'Inline',
        value: 'secret-value',
      },
    };

    const mockSecret: Secret = { ...createData };

    vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockSecret));

    const result = await api.create(createData);

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/ng/api/v2/secrets'),
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ secret: createData }),
      })
    );
    expect(result).toEqual(mockSecret);
  });

  it('should update secret', async () => {
    const updateData = {
      name: 'Updated Secret',
    };

    const mockSecret: Secret = {
      identifier: 'secret1',
      orgIdentifier: 'org1',
      projectIdentifier: 'proj1',
      name: 'Updated Secret',
      type: 'SecretText',
    };

    vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockSecret));

    const result = await api.update('secret1', updateData, 'org1', 'proj1');

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/ng/api/v2/secrets/secret1'),
      expect.objectContaining({
        method: 'PUT',
        body: JSON.stringify({ secret: updateData }),
      })
    );
    expect(result).toEqual(mockSecret);
  });

  it('should delete secret', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(true));

    const result = await api.delete('secret1', 'org1', 'proj1');

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/ng/api/v2/secrets/secret1'),
      expect.objectContaining({
        method: 'DELETE',
      })
    );
    expect(result).toEqual(true);
  });
});
