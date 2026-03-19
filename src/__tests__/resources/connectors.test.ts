/**
 * ConnectorsAPI tests
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { HarnessClient } from '../../client.js';
import { ConnectorsAPI } from '../../resources/connectors.js';
import { createMockResponse } from '../setup.js';
import type { Connector } from '../../types/connector.js';

describe('ConnectorsAPI', () => {
  let client: HarnessClient;
  let api: ConnectorsAPI;

  beforeEach(() => {
    client = new HarnessClient({
      apiKey: 'test-key',
      accountId: 'test-account',
    });
    api = new ConnectorsAPI(client);
  });

  describe('list', () => {
    it('should list connectors at account level', async () => {
      const mockConnectors: Connector[] = [
        {
          identifier: 'conn1',
          name: 'Connector 1',
          type: 'K8sCluster',
        },
        {
          identifier: 'conn2',
          name: 'Connector 2',
          type: 'DockerRegistry',
        },
      ];

      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockConnectors));

      const result = await api.list();

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/ng/api/connectors'),
        expect.any(Object)
      );
      expect(result).toEqual(mockConnectors);
    });

    it('should list connectors at project level', async () => {
      const mockConnectors: Connector[] = [
        {
          identifier: 'conn1',
          orgIdentifier: 'org1',
          projectIdentifier: 'proj1',
          name: 'Connector 1',
          type: 'K8sCluster',
        },
      ];

      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockConnectors));

      const result = await api.list('org1', 'proj1');

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/ng/api/connectors'),
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
      expect(result).toEqual(mockConnectors);
    });
  });

  describe('get', () => {
    it('should get connector by identifier', async () => {
      const mockConnector: Connector = {
        identifier: 'my-conn',
        orgIdentifier: 'org1',
        projectIdentifier: 'proj1',
        name: 'My Connector',
        type: 'K8sCluster',
      };

      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockConnector));

      const result = await api.get('my-conn', 'org1', 'proj1');

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/ng/api/connectors/my-conn'),
        expect.any(Object)
      );
      expect(result).toEqual(mockConnector);
    });
  });

  describe('create', () => {
    it('should create connector', async () => {
      const createData = {
        identifier: 'new-conn',
        orgIdentifier: 'org1',
        projectIdentifier: 'proj1',
        name: 'New Connector',
        type: 'K8sCluster' as const,
      };

      const mockConnector: Connector = { ...createData };

      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockConnector));

      const result = await api.create(createData);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/ng/api/connectors'),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ connector: createData }),
        })
      );
      expect(result).toEqual(mockConnector);
    });
  });

  describe('update', () => {
    it('should update connector', async () => {
      const updateData = {
        name: 'Updated Connector',
      };

      const mockConnector: Connector = {
        identifier: 'my-conn',
        orgIdentifier: 'org1',
        projectIdentifier: 'proj1',
        name: 'Updated Connector',
        type: 'K8sCluster',
      };

      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockConnector));

      const result = await api.update('my-conn', updateData, 'org1', 'proj1');

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/ng/api/connectors/my-conn'),
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify({ connector: updateData }),
        })
      );
      expect(result).toEqual(mockConnector);
    });
  });

  describe('delete', () => {
    it('should delete connector', async () => {
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(true));

      const result = await api.delete('my-conn', 'org1', 'proj1');

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/ng/api/connectors/my-conn'),
        expect.objectContaining({
          method: 'DELETE',
        })
      );
      expect(result).toEqual(true);
    });
  });

  describe('testConnection', () => {
    it('should test connector connection', async () => {
      const testResult = {
        status: 'SUCCESS',
      };

      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(testResult));

      const result = await api.testConnection('my-conn', 'org1', 'proj1');

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/ng/api/connectors/testConnection/my-conn'),
        expect.objectContaining({
          method: 'POST',
        })
      );
      expect(result).toEqual(testResult);
    });
  });
});
