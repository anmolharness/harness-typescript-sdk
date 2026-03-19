/**
 * Git Sync API
 */

import type { HarnessClient } from '../client.js';
import type { GitSync, GitSyncError, GitBranch, PageResponse } from '../types/index.js';

export class GitSyncAPI {
  constructor(private client: HarnessClient) {}

  async listConfigs(orgIdentifier?: string, projectIdentifier?: string): Promise<GitSync[]> {
    const queryParams: Record<string, string> = {};
    if (orgIdentifier) queryParams.orgIdentifier = orgIdentifier;
    if (projectIdentifier) queryParams.projectIdentifier = projectIdentifier;
    return this.client.get<GitSync[]>('/git-sync', queryParams);
  }

  async createConfig(data: Partial<GitSync>): Promise<GitSync> {
    const queryParams: Record<string, string> = {};
    if (data.orgIdentifier) queryParams.orgIdentifier = data.orgIdentifier;
    if (data.projectIdentifier) queryParams.projectIdentifier = data.projectIdentifier;
    return this.client.post<GitSync>('/git-sync', data, queryParams);
  }

  async updateConfig(identifier: string, data: Partial<GitSync>, orgIdentifier?: string, projectIdentifier?: string): Promise<GitSync> {
    const queryParams: Record<string, string> = {};
    if (orgIdentifier) queryParams.orgIdentifier = orgIdentifier;
    if (projectIdentifier) queryParams.projectIdentifier = projectIdentifier;
    return this.client.put<GitSync>(`/git-sync/${identifier}`, data, queryParams);
  }

  async deleteConfig(identifier: string, orgIdentifier?: string, projectIdentifier?: string): Promise<boolean> {
    const queryParams: Record<string, string> = {};
    if (orgIdentifier) queryParams.orgIdentifier = orgIdentifier;
    if (projectIdentifier) queryParams.projectIdentifier = projectIdentifier;
    return this.client.delete<boolean>(`/git-sync/${identifier}`, queryParams);
  }

  async listErrors(orgIdentifier?: string, projectIdentifier?: string, page?: number, limit?: number): Promise<PageResponse<GitSyncError>> {
    const queryParams: Record<string, string> = {
      pageIndex: page?.toString() || '0',
      pageSize: limit?.toString() || '50',
    };
    if (orgIdentifier) queryParams.orgIdentifier = orgIdentifier;
    if (projectIdentifier) queryParams.projectIdentifier = projectIdentifier;
    return this.client.get<PageResponse<GitSyncError>>('/git-sync/errors', queryParams);
  }

  async listBranches(repoIdentifier: string, orgIdentifier?: string, projectIdentifier?: string): Promise<GitBranch[]> {
    const queryParams: Record<string, string> = { repoIdentifier };
    if (orgIdentifier) queryParams.orgIdentifier = orgIdentifier;
    if (projectIdentifier) queryParams.projectIdentifier = projectIdentifier;
    return this.client.get<GitBranch[]>('/git-sync/branches', queryParams);
  }
}
