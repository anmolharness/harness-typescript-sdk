/**
 * EnvironmentsAPI tests
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { HarnessClient } from '../../client.js';
import { EnvironmentsAPI } from '../../resources/environments.js';
import { createMockResponse } from '../setup.js';
import type { Environment } from '../../types/environment.js';

describe('EnvironmentsAPI', () => {
  let client: HarnessClient;
  let api: EnvironmentsAPI;

  beforeEach(() => {
    client = new HarnessClient({
      apiKey: 'test-key',
      accountId: 'test-account',
    });
    api = new EnvironmentsAPI(client);
  });

  describe('list', () => {
    it('should list environments', async () => {
      const mockEnvironments: Environment[] = [
        {
          identifier: 'env1',
          orgIdentifier: 'org1',
          projectIdentifier: 'proj1',
          name: 'Environment 1',
          type: 'Production',
        },
        {
          identifier: 'env2',
          orgIdentifier: 'org1',
          projectIdentifier: 'proj1',
          name: 'Environment 2',
          type: 'PreProduction',
        },
      ];

      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockEnvironments));

      const result = await api.list('org1', 'proj1');

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/ng/api/environmentsV2'),
        expect.any(Object)
      );
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('orgIdentifier=org1'),
        expect.any(Object)
      );
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('projectIdentifier=proj1'),
        expect.any(Object)
      );
      expect(result).toEqual(mockEnvironments);
    });
  });

  describe('get', () => {
    it('should get environment by identifier', async () => {
      const mockEnvironment: Environment = {
        identifier: 'my-env',
        orgIdentifier: 'org1',
        projectIdentifier: 'proj1',
        name: 'My Environment',
        type: 'Production',
      };

      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockEnvironment));

      const result = await api.get('org1', 'proj1', 'my-env');

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/ng/api/environmentsV2/my-env'),
        expect.any(Object)
      );
      expect(result).toEqual(mockEnvironment);
    });
  });

  describe('create', () => {
    it('should create environment', async () => {
      const createData = {
        identifier: 'new-env',
        orgIdentifier: 'org1',
        projectIdentifier: 'proj1',
        name: 'New Environment',
        type: 'Production' as const,
      };

      const mockEnvironment: Environment = { ...createData };

      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockEnvironment));

      const result = await api.create(createData);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/ng/api/environmentsV2'),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ environment: createData }),
        })
      );
      expect(result).toEqual(mockEnvironment);
    });
  });

  describe('update', () => {
    it('should update environment', async () => {
      const updateData = {
        name: 'Updated Environment',
        type: 'PreProduction' as const,
      };

      const mockEnvironment: Environment = {
        identifier: 'my-env',
        orgIdentifier: 'org1',
        projectIdentifier: 'proj1',
        name: 'Updated Environment',
        type: 'PreProduction',
      };

      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockEnvironment));

      const result = await api.update('org1', 'proj1', 'my-env', updateData);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/ng/api/environmentsV2/my-env'),
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify({ environment: updateData }),
        })
      );
      expect(result).toEqual(mockEnvironment);
    });
  });

  describe('delete', () => {
    it('should delete environment', async () => {
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(true));

      const result = await api.delete('org1', 'proj1', 'my-env');

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/ng/api/environmentsV2/my-env'),
        expect.objectContaining({
          method: 'DELETE',
        })
      );
      expect(result).toBe(true);
    });
  });
});
