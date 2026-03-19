/**
 * ServicesAPI tests
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { HarnessClient } from '../../client.js';
import { ServicesAPI } from '../../resources/services.js';
import { createMockResponse } from '../setup.js';
import type { Service } from '../../types/service.js';

describe('ServicesAPI', () => {
  let client: HarnessClient;
  let api: ServicesAPI;

  beforeEach(() => {
    client = new HarnessClient({
      apiKey: 'test-key',
      accountId: 'test-account',
    });
    api = new ServicesAPI(client);
  });

  describe('list', () => {
    it('should list services', async () => {
      const mockServices: Service[] = [
        {
          identifier: 'service1',
          orgIdentifier: 'org1',
          projectIdentifier: 'proj1',
          name: 'Service 1',
        },
        {
          identifier: 'service2',
          orgIdentifier: 'org1',
          projectIdentifier: 'proj1',
          name: 'Service 2',
        },
      ];

      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockServices));

      const result = await api.list('org1', 'proj1');

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/ng/api/servicesV2'),
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
      expect(result).toEqual(mockServices);
    });
  });

  describe('get', () => {
    it('should get service by identifier', async () => {
      const mockService: Service = {
        identifier: 'my-service',
        orgIdentifier: 'org1',
        projectIdentifier: 'proj1',
        name: 'My Service',
      };

      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockService));

      const result = await api.get('org1', 'proj1', 'my-service');

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/ng/api/servicesV2/my-service'),
        expect.any(Object)
      );
      expect(result).toEqual(mockService);
    });
  });

  describe('create', () => {
    it('should create service', async () => {
      const createData = {
        identifier: 'new-service',
        orgIdentifier: 'org1',
        projectIdentifier: 'proj1',
        name: 'New Service',
      };

      const mockService: Service = { ...createData };

      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockService));

      const result = await api.create(createData);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/ng/api/servicesV2'),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ service: createData }),
        })
      );
      expect(result).toEqual(mockService);
    });
  });

  describe('update', () => {
    it('should update service', async () => {
      const updateData = {
        name: 'Updated Service',
      };

      const mockService: Service = {
        identifier: 'my-service',
        orgIdentifier: 'org1',
        projectIdentifier: 'proj1',
        name: 'Updated Service',
      };

      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockService));

      const result = await api.update('org1', 'proj1', 'my-service', updateData);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/ng/api/servicesV2/my-service'),
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify({ service: updateData }),
        })
      );
      expect(result).toEqual(mockService);
    });
  });

  describe('delete', () => {
    it('should delete service', async () => {
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(true));

      const result = await api.delete('org1', 'proj1', 'my-service');

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/ng/api/servicesV2/my-service'),
        expect.objectContaining({
          method: 'DELETE',
        })
      );
      expect(result).toBe(true);
    });
  });
});
