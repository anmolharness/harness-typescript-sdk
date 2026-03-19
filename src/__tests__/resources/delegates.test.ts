/**
 * DelegatesAPI tests
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { HarnessClient } from '../../client.js';
import { DelegatesAPI } from '../../resources/delegates.js';
import { createMockResponse } from '../setup.js';

describe('DelegatesAPI', () => {
  let client: HarnessClient;
  let api: DelegatesAPI;

  beforeEach(() => {
    client = new HarnessClient({
      apiKey: 'test-key',
      accountId: 'test-account',
    });
    api = new DelegatesAPI(client);
  });

  it('should list delegates', async () => {
    const mockDelegates = [
      { uuid: 'delegate1', delegateName: 'Delegate 1', status: 'ENABLED' },
      { uuid: 'delegate2', delegateName: 'Delegate 2', status: 'ENABLED' },
    ];

    vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockDelegates));

    const result = await api.list();

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/ng/api/delegate-setup-resource'),
      expect.any(Object)
    );
    expect(result).toEqual(mockDelegates);
  });

  it('should get delegate', async () => {
    const mockDelegate = {
      uuid: 'delegate1',
      delegateName: 'Delegate 1',
      status: 'ENABLED',
    };

    vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockDelegate));

    const result = await api.get('delegate1');

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/ng/api/delegate-setup-resource/delegate1'),
      expect.any(Object)
    );
    expect(result).toEqual(mockDelegate);
  });

  it('should delete delegate', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(true));

    const result = await api.delete('delegate1');

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/ng/api/delegate-setup-resource/delegate1'),
      expect.objectContaining({
        method: 'DELETE',
      })
    );
    expect(result).toEqual(true);
  });
});
