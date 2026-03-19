/**
 * PolicySetsAPI tests
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { HarnessClient } from '../../client.js';
import { PolicySetsAPI } from '../../resources/policy-sets.js';
import { createMockResponse } from '../setup.js';

describe('PolicySetsAPI', () => {
  let client: HarnessClient;
  let api: PolicySetsAPI;

  beforeEach(() => {
    client = new HarnessClient({
      apiKey: 'test-key',
      accountId: 'test-account',
    });
    api = new PolicySetsAPI(client);
  });

  it('should list policy sets', async () => {
    const mockPolicySets = [
      {
        identifier: 'policyset1',
        name: 'Policy Set 1',
        enabled: true,
      },
    ];

    vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockPolicySets));

    const result = await api.list();

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/pm/api/v1/policies/sets'),
      expect.any(Object)
    );
    expect(result).toEqual(mockPolicySets);
  });

  it('should get policy set', async () => {
    const mockPolicySet = {
      identifier: 'policyset1',
      name: 'Policy Set 1',
      enabled: true,
    };

    vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockPolicySet));

    const result = await api.get('policyset1');

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/pm/api/v1/policies/sets/policyset1'),
      expect.any(Object)
    );
    expect(result).toEqual(mockPolicySet);
  });

  it('should create policy set', async () => {
    const createData = {
      identifier: 'new-policyset',
      name: 'New Policy Set',
      enabled: true,
      policies: [],
    };

    const mockPolicySet = { ...createData };

    vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockPolicySet));

    const result = await api.create(createData);

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/pm/api/v1/policies/sets'),
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ policySet: createData }),
      })
    );
    expect(result).toEqual(mockPolicySet);
  });

  it('should delete policy set', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(true));

    const result = await api.delete('policyset1');

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/pm/api/v1/policies/sets/policyset1'),
      expect.objectContaining({
        method: 'DELETE',
      })
    );
    expect(result).toEqual(true);
  });
});
