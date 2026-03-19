/**
 * PipelinesAPI tests
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { HarnessClient } from '../../client.js';
import { PipelinesAPI } from '../../resources/pipelines.js';
import { createMockResponse } from '../setup.js';
import type { Pipeline } from '../../types/pipeline.js';

describe('PipelinesAPI', () => {
  let client: HarnessClient;
  let api: PipelinesAPI;

  beforeEach(() => {
    client = new HarnessClient({
      apiKey: 'test-key',
      accountId: 'test-account',
    });
    api = new PipelinesAPI(client);
  });

  describe('list', () => {
    it('should list pipelines', async () => {
      const mockPipelines: Pipeline[] = [
        {
          identifier: 'pipeline1',
          orgIdentifier: 'org1',
          projectIdentifier: 'proj1',
          name: 'Pipeline 1',
        },
        {
          identifier: 'pipeline2',
          orgIdentifier: 'org1',
          projectIdentifier: 'proj1',
          name: 'Pipeline 2',
        },
      ];

      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockPipelines));

      const result = await api.list('org1', 'proj1');

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/pipeline/api/pipelines'),
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
      expect(result).toEqual(mockPipelines);
    });
  });

  describe('get', () => {
    it('should get pipeline by identifier', async () => {
      const mockPipeline: Pipeline = {
        identifier: 'my-pipeline',
        orgIdentifier: 'org1',
        projectIdentifier: 'proj1',
        name: 'My Pipeline',
      };

      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockPipeline));

      const result = await api.get('org1', 'proj1', 'my-pipeline');

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/pipeline/api/pipelines/v2/my-pipeline'),
        expect.any(Object)
      );
      expect(result).toEqual(mockPipeline);
    });
  });

  describe('create', () => {
    it('should create pipeline from YAML', async () => {
      const yaml = `
pipeline:
  name: My Pipeline
  identifier: my-pipeline
  stages:
    - stage:
        name: Deploy
`;

      const mockPipeline: Pipeline = {
        identifier: 'my-pipeline',
        orgIdentifier: 'org1',
        projectIdentifier: 'proj1',
        name: 'My Pipeline',
      };

      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockPipeline));

      const result = await api.create({
        orgIdentifier: 'org1',
        projectIdentifier: 'proj1',
        yaml,
      });

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/pipeline/api/pipelines/v2'),
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/yaml',
          }),
          body: yaml,
        })
      );
      expect(result).toEqual(mockPipeline);
    });
  });

  describe('update', () => {
    it('should update pipeline with YAML', async () => {
      const yaml = `
pipeline:
  name: Updated Pipeline
`;

      const mockPipeline: Pipeline = {
        identifier: 'my-pipeline',
        orgIdentifier: 'org1',
        projectIdentifier: 'proj1',
        name: 'Updated Pipeline',
      };

      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockPipeline));

      const result = await api.update('org1', 'proj1', 'my-pipeline', yaml);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/pipeline/api/pipelines/v2/my-pipeline'),
        expect.objectContaining({
          method: 'PUT',
          headers: expect.objectContaining({
            'Content-Type': 'application/yaml',
          }),
        })
      );
      expect(result).toEqual(mockPipeline);
    });
  });

  describe('delete', () => {
    it('should delete pipeline', async () => {
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(true));

      const result = await api.delete('org1', 'proj1', 'my-pipeline');

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/pipeline/api/pipelines/my-pipeline'),
        expect.objectContaining({
          method: 'DELETE',
        })
      );
      expect(result).toEqual(true);
    });
  });

  describe('execute', () => {
    it('should execute pipeline', async () => {
      const mockExecution = {
        planExecutionId: 'exec-123',
        status: 'RUNNING',
      };

      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockExecution));

      const result = await api.execute('org1', 'proj1', 'my-pipeline');

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/pipeline/api/pipelines/execute/my-pipeline'),
        expect.objectContaining({
          method: 'POST',
        })
      );
      expect(result).toEqual(mockExecution);
    });

    it('should execute pipeline with input set references', async () => {
      const mockExecution = {
        planExecutionId: 'exec-123',
        status: 'RUNNING',
      };

      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockExecution));

      await api.execute('org1', 'proj1', 'my-pipeline', {
        inputSetReferences: ['input-set-1', 'input-set-2'],
      });

      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: 'POST',
          body: expect.stringContaining('input-set-1'),
        })
      );
    });
  });
});
