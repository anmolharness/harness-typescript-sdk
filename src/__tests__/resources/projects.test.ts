/**
 * ProjectsAPI tests
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { HarnessClient } from '../../client.js';
import { ProjectsAPI } from '../../resources/projects.js';
import { createMockResponse } from '../setup.js';
import type { Project } from '../../types/project.js';

describe('ProjectsAPI', () => {
  let client: HarnessClient;
  let api: ProjectsAPI;

  beforeEach(() => {
    client = new HarnessClient({
      apiKey: 'test-key',
      accountId: 'test-account',
    });
    api = new ProjectsAPI(client);
  });

  describe('list', () => {
    it('should list projects', async () => {
      const mockProjects: Project[] = [
        { identifier: 'proj1', orgIdentifier: 'org1', name: 'Project 1' },
        { identifier: 'proj2', orgIdentifier: 'org1', name: 'Project 2' },
      ];

      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockProjects));

      const result = await api.list('org1');

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/ng/api/projects'),
        expect.any(Object)
      );
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('orgIdentifier=org1'),
        expect.any(Object)
      );
      expect(result).toEqual(mockProjects);
    });
  });

  describe('get', () => {
    it('should get project by identifier', async () => {
      const mockProject: Project = {
        identifier: 'my-proj',
        orgIdentifier: 'my-org',
        name: 'My Project',
      };

      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockProject));

      const result = await api.get('my-org', 'my-proj');

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/ng/api/projects/my-proj'),
        expect.any(Object)
      );
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('orgIdentifier=my-org'),
        expect.any(Object)
      );
      expect(result).toEqual(mockProject);
    });
  });

  describe('create', () => {
    it('should create project', async () => {
      const createData = {
        identifier: 'new-proj',
        orgIdentifier: 'my-org',
        name: 'New Project',
      };

      const mockProject: Project = { ...createData };

      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockProject));

      const result = await api.create(createData);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/ng/api/projects'),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ project: createData }),
        })
      );
      expect(result).toEqual(mockProject);
    });
  });

  describe('update', () => {
    it('should update project', async () => {
      const updateData = {
        name: 'Updated Project',
      };

      const mockProject: Project = {
        identifier: 'my-proj',
        orgIdentifier: 'my-org',
        name: 'Updated Project',
      };

      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockProject));

      const result = await api.update('my-org', 'my-proj', updateData);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/ng/api/projects/my-proj'),
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify({ project: updateData }),
        })
      );
      expect(result).toEqual(mockProject);
    });
  });

  describe('delete', () => {
    it('should delete project', async () => {
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(true));

      const result = await api.delete('my-org', 'my-proj');

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/ng/api/projects/my-proj'),
        expect.objectContaining({
          method: 'DELETE',
        })
      );
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('orgIdentifier=my-org'),
        expect.any(Object)
      );
      expect(result).toBe(true);
    });
  });
});
