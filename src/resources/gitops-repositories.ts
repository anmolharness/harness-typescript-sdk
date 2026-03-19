/**
 * GitOps Repositories API
 */

import type { HarnessClient } from '../client.js';
import type { GitOpsRepository, PageResponse, ListQueryParams } from '../types/index.js';

export class GitOpsRepositoriesAPI {
  constructor(private client: HarnessClient) {}

  /**
   * List GitOps repositories
   */
  async list(agentIdentifier: string, orgIdentifier?: string, projectIdentifier?: string, params?: ListQueryParams): Promise<PageResponse<GitOpsRepository>> {
    const queryParams: Record<string, string> = {
      agentIdentifier,
      page: params?.page?.toString() || '0',
      size: params?.limit?.toString() || '50',
    };

    if (orgIdentifier) {
      queryParams.orgIdentifier = orgIdentifier;
    }

    if (projectIdentifier) {
      queryParams.projectIdentifier = projectIdentifier;
    }

    return this.client.get<PageResponse<GitOpsRepository>>('/gitops/repositories', queryParams);
  }

  /**
   * Get GitOps repository
   */
  async get(agentIdentifier: string, identifier: string, orgIdentifier?: string, projectIdentifier?: string): Promise<GitOpsRepository> {
    const queryParams: Record<string, string> = {
      agentIdentifier,
    };

    if (orgIdentifier) {
      queryParams.orgIdentifier = orgIdentifier;
    }

    if (projectIdentifier) {
      queryParams.projectIdentifier = projectIdentifier;
    }

    return this.client.get<GitOpsRepository>(`/gitops/repositories/${identifier}`, queryParams);
  }

  /**
   * Create GitOps repository
   */
  async create(data: Partial<GitOpsRepository>): Promise<GitOpsRepository> {
    const queryParams: Record<string, string> = {
      agentIdentifier: data.agentIdentifier!,
    };

    if (data.orgIdentifier) {
      queryParams.orgIdentifier = data.orgIdentifier;
    }

    if (data.projectIdentifier) {
      queryParams.projectIdentifier = data.projectIdentifier;
    }

    return this.client.post<GitOpsRepository>('/gitops/repositories', { repository: data }, queryParams);
  }

  /**
   * Delete GitOps repository
   */
  async delete(agentIdentifier: string, identifier: string, orgIdentifier?: string, projectIdentifier?: string): Promise<boolean> {
    const queryParams: Record<string, string> = {
      agentIdentifier,
    };

    if (orgIdentifier) {
      queryParams.orgIdentifier = orgIdentifier;
    }

    if (projectIdentifier) {
      queryParams.projectIdentifier = projectIdentifier;
    }

    return this.client.delete<boolean>(`/gitops/repositories/${identifier}`, queryParams);
  }
}
