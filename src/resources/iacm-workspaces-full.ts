/**
 * IACM Workspaces API (Full Implementation)
 */

import type { HarnessClient } from '../client.js';

export interface IacmWorkspace {
  identifier: string;
  orgIdentifier: string;
  projectIdentifier: string;
  name: string;
  description?: string;
  providerConnector: string;
  repository: string;
  repositoryBranch: string;
  repositoryPath: string;
  terraformVersion?: string;
  costEstimation?: boolean;
}

export class IacmWorkspacesAPI {
  constructor(private client: HarnessClient) {}

  async list(orgIdentifier: string, projectIdentifier: string): Promise<IacmWorkspace[]> {
    return this.client.get<IacmWorkspace[]>('/iacm/api/workspaces', {
      orgIdentifier,
      projectIdentifier,
    });
  }

  async get(orgIdentifier: string, projectIdentifier: string, identifier: string): Promise<IacmWorkspace> {
    return this.client.get<IacmWorkspace>(`/iacm/api/workspaces/${identifier}`, {
      orgIdentifier,
      projectIdentifier,
    });
  }

  async create(data: Partial<IacmWorkspace>): Promise<IacmWorkspace> {
    return this.client.post<IacmWorkspace>('/iacm/api/workspaces', data, {
      orgIdentifier: data.orgIdentifier!,
      projectIdentifier: data.projectIdentifier!,
    });
  }

  async delete(orgIdentifier: string, projectIdentifier: string, identifier: string): Promise<boolean> {
    return this.client.delete<boolean>(`/iacm/api/workspaces/${identifier}`, {
      orgIdentifier,
      projectIdentifier,
    });
  }

  async plan(orgIdentifier: string, projectIdentifier: string, identifier: string): Promise<{ executionId: string }> {
    return this.client.post<{ executionId: string }>(`/iacm/api/workspaces/${identifier}/plan`, {}, {
      orgIdentifier,
      projectIdentifier,
    });
  }

  async apply(orgIdentifier: string, projectIdentifier: string, identifier: string): Promise<{ executionId: string }> {
    return this.client.post<{ executionId: string }>(`/iacm/api/workspaces/${identifier}/apply`, {}, {
      orgIdentifier,
      projectIdentifier,
    });
  }
}
