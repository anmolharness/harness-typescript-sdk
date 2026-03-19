/**
 * OrganizationsAPI tests
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { HarnessClient } from '../../client.js';
import { OrganizationsAPI } from '../../resources/organizations.js';
import { createMockResponse } from '../setup.js';
import type { Organization } from '../../types/organization.js';

describe('OrganizationsAPI', () => {
  let client: HarnessClient;
  let api: OrganizationsAPI;

  beforeEach(() => {
    client = new HarnessClient({
      apiKey: 'test-key',
      accountId: 'test-account',
    });
    api = new OrganizationsAPI(client);
  });

  describe('list', () => {
    it('should list organizations', async () => {
      const mockOrgs: Organization[] = [
        { identifier: 'org1', name: 'Organization 1' },
        { identifier: 'org2', name: 'Organization 2' },
      ];

      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockOrgs));

      const result = await api.list();

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/ng/api/organizations'),
        expect.any(Object)
      );
      expect(result).toEqual(mockOrgs);
    });

    it('should pass pagination params', async () => {
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse([]));

      await api.list({ page: 1, limit: 50 });

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('pageIndex=1'),
        expect.any(Object)
      );
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('pageSize=50'),
        expect.any(Object)
      );
    });
  });

  describe('get', () => {
    it('should get organization by identifier', async () => {
      const mockOrg: Organization = {
        identifier: 'my-org',
        name: 'My Organization',
      };

      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockOrg));

      const result = await api.get('my-org');

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/ng/api/organizations/my-org'),
        expect.any(Object)
      );
      expect(result).toEqual(mockOrg);
    });
  });

  describe('create', () => {
    it('should create organization', async () => {
      const createData = {
        identifier: 'new-org',
        name: 'New Organization',
      };

      const mockOrg: Organization = { ...createData };

      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockOrg));

      const result = await api.create(createData);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/ng/api/organizations'),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ organization: createData }),
        })
      );
      expect(result).toEqual(mockOrg);
    });
  });

  describe('update', () => {
    it('should update organization', async () => {
      const updateData = {
        name: 'Updated Organization',
      };

      const mockOrg: Organization = {
        identifier: 'my-org',
        name: 'Updated Organization',
      };

      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockOrg));

      const result = await api.update('my-org', updateData);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/ng/api/organizations/my-org'),
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify({ organization: updateData }),
        })
      );
      expect(result).toEqual(mockOrg);
    });
  });

  describe('delete', () => {
    it('should delete organization', async () => {
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(true));

      const result = await api.delete('my-org');

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/ng/api/organizations/my-org'),
        expect.objectContaining({
          method: 'DELETE',
        })
      );
      expect(result).toBe(true);
    });
  });
});
