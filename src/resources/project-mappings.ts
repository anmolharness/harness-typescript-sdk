/**
 * Project Mappings API
 */

import type { HarnessClient } from '../client.js';

export interface ProjectMapping {
  orgIdentifier: string;
  projectIdentifier: string;
  gitConnectorRef: string;
  repository: string;
  branch: string;
  filePath: string;
}

export class ProjectMappingsAPI {
  constructor(private client: HarnessClient) {}

  async list(orgIdentifier: string, projectIdentifier: string): Promise<ProjectMapping[]> {
    return this.client.get<ProjectMapping[]>('/project-mappings', {
      orgIdentifier,
      projectIdentifier,
    });
  }

  async create(data: ProjectMapping): Promise<ProjectMapping> {
    return this.client.post<ProjectMapping>('/project-mappings', data);
  }

  async delete(orgIdentifier: string, projectIdentifier: string): Promise<boolean> {
    return this.client.delete<boolean>('/project-mappings', {
      orgIdentifier,
      projectIdentifier,
    });
  }
}
