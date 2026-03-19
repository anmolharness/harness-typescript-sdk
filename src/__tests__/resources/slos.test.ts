/**
 * SLOsAPI tests
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { HarnessClient } from '../../client.js';
import { SLOsAPI } from '../../resources/slos.js';
import { createMockResponse } from '../setup.js';

describe('SLOsAPI', () => {
  let client: HarnessClient;
  let api: SLOsAPI;

  beforeEach(() => {
    client = new HarnessClient({
      apiKey: 'test-key',
      accountId: 'test-account',
    });
    api = new SLOsAPI(client);
  });

  it('should list SLOs', async () => {
    const mockSLOs = [
      {
        identifier: 'slo1',
        orgIdentifier: 'org1',
        projectIdentifier: 'proj1',
        name: 'SLO 1',
        target: 99.9,
      },
    ];

    vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockSLOs));

    const result = await api.list('org1', 'proj1');

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/cv/api/slo-dashboard'),
      expect.any(Object)
    );
    expect(result).toEqual(mockSLOs);
  });

  it('should get SLO', async () => {
    const mockSLO = {
      identifier: 'slo1',
      orgIdentifier: 'org1',
      projectIdentifier: 'proj1',
      name: 'SLO 1',
      target: 99.9,
    };

    vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockSLO));

    const result = await api.get('org1', 'proj1', 'slo1');

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/cv/api/slo/slo1'),
      expect.any(Object)
    );
    expect(result).toEqual(mockSLO);
  });

  it('should create SLO', async () => {
    const createData = {
      identifier: 'new-slo',
      orgIdentifier: 'org1',
      projectIdentifier: 'proj1',
      name: 'New SLO',
      target: 99.5,
      type: 'Simple' as const,
    };

    const mockSLO = { ...createData };

    vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockSLO));

    const result = await api.create(createData);

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/cv/api/slo'),
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ slo: createData }),
      })
    );
    expect(result).toEqual(mockSLO);
  });

  it('should delete SLO', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(true));

    const result = await api.delete('org1', 'proj1', 'slo1');

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/cv/api/slo/slo1'),
      expect.objectContaining({
        method: 'DELETE',
      })
    );
    expect(result).toEqual(true);
  });
});
