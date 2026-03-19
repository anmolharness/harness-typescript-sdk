/**
 * GitOps Agents API
 */

import type { HarnessClient } from '../client.js';
import type { GitOpsAgent, PageResponse, ListQueryParams } from '../types/index.js';

export class GitOpsAgentsAPI {
  constructor(private client: HarnessClient) {}

  /**
   * List GitOps agents
   */
  async list(orgIdentifier?: string, projectIdentifier?: string, params?: ListQueryParams): Promise<PageResponse<GitOpsAgent>> {
    const queryParams: Record<string, string> = {
      page: params?.page?.toString() || '0',
      size: params?.limit?.toString() || '50',
    };

    if (orgIdentifier) {
      queryParams.orgIdentifier = orgIdentifier;
    }

    if (projectIdentifier) {
      queryParams.projectIdentifier = projectIdentifier;
    }

    return this.client.get<PageResponse<GitOpsAgent>>('/gitops/agents', queryParams);
  }

  /**
   * Get GitOps agent
   */
  async get(identifier: string, orgIdentifier?: string, projectIdentifier?: string): Promise<GitOpsAgent> {
    const queryParams: Record<string, string> = {};

    if (orgIdentifier) {
      queryParams.orgIdentifier = orgIdentifier;
    }

    if (projectIdentifier) {
      queryParams.projectIdentifier = projectIdentifier;
    }

    return this.client.get<GitOpsAgent>(`/gitops/agents/${identifier}`, queryParams);
  }

  /**
   * Create GitOps agent
   */
  async create(data: Partial<GitOpsAgent>): Promise<GitOpsAgent> {
    const queryParams: Record<string, string> = {};

    if (data.orgIdentifier) {
      queryParams.orgIdentifier = data.orgIdentifier;
    }

    if (data.projectIdentifier) {
      queryParams.projectIdentifier = data.projectIdentifier;
    }

    return this.client.post<GitOpsAgent>('/gitops/agents', { agent: data }, queryParams);
  }

  /**
   * Delete GitOps agent
   */
  async delete(identifier: string, orgIdentifier?: string, projectIdentifier?: string): Promise<boolean> {
    const queryParams: Record<string, string> = {};

    if (orgIdentifier) {
      queryParams.orgIdentifier = orgIdentifier;
    }

    if (projectIdentifier) {
      queryParams.projectIdentifier = projectIdentifier;
    }

    return this.client.delete<boolean>(`/gitops/agents/${identifier}`, queryParams);
  }
}
