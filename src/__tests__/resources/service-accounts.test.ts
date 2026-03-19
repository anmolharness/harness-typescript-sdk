/**
 * ServiceAccountsAPI tests
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { HarnessClient } from '../../client.js';
import { ServiceAccountsAPI } from '../../resources/service-accounts.js';
import { createMockResponse } from '../setup.js';

describe('ServiceAccountsAPI', () => {
  let client: HarnessClient;
  let api: ServiceAccountsAPI;

  beforeEach(() => {
    client = new HarnessClient({
      apiKey: 'test-key',
      accountId: 'test-account',
    });
    api = new ServiceAccountsAPI(client);
  });

  it('should list service accounts', async () => {
    const mockServiceAccounts = [
      { identifier: 'sa1', email: 'sa1@example.com', name: 'SA 1' },
      { identifier: 'sa2', email: 'sa2@example.com', name: 'SA 2' },
    ];

    vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockServiceAccounts));

    const result = await api.list();

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/ng/api/serviceaccount'),
      expect.any(Object)
    );
    expect(result).toEqual(mockServiceAccounts);
  });

  it('should get service account', async () => {
    const mockSA = {
      identifier: 'sa1',
      email: 'sa1@example.com',
      name: 'SA 1',
    };

    vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockSA));

    const result = await api.get('sa1');

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/ng/api/serviceaccount/sa1'),
      expect.any(Object)
    );
    expect(result).toEqual(mockSA);
  });

  it('should create service account', async () => {
    const createData = {
      identifier: 'new-sa',
      email: 'newsa@example.com',
      name: 'New SA',
    };

    const mockSA = { ...createData };

    vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockSA));

    const result = await api.create(createData);

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/ng/api/serviceaccount'),
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ serviceAccount: createData }),
      })
    );
    expect(result).toEqual(mockSA);
  });

  it('should delete service account', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(true));

    const result = await api.delete('sa1');

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/ng/api/serviceaccount/sa1'),
      expect.objectContaining({
        method: 'DELETE',
      })
    );
    expect(result).toEqual(true);
  });
});
