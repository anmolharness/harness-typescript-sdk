/**
 * GitOps Clusters API
 */

import type { HarnessClient } from '../client.js';
import type { GitOpsCluster, PageResponse, ListQueryParams } from '../types/index.js';

export class GitOpsClustersAPI {
  constructor(private client: HarnessClient) {}

  /**
   * List GitOps clusters
   */
  async list(agentIdentifier: string, orgIdentifier?: string, projectIdentifier?: string, params?: ListQueryParams): Promise<PageResponse<GitOpsCluster>> {
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

    return this.client.get<PageResponse<GitOpsCluster>>('/gitops/clusters', queryParams);
  }

  /**
   * Get GitOps cluster
   */
  async get(agentIdentifier: string, identifier: string, orgIdentifier?: string, projectIdentifier?: string): Promise<GitOpsCluster> {
    const queryParams: Record<string, string> = {
      agentIdentifier,
    };

    if (orgIdentifier) {
      queryParams.orgIdentifier = orgIdentifier;
    }

    if (projectIdentifier) {
      queryParams.projectIdentifier = projectIdentifier;
    }

    return this.client.get<GitOpsCluster>(`/gitops/clusters/${identifier}`, queryParams);
  }

  /**
   * Create GitOps cluster
   */
  async create(data: Partial<GitOpsCluster>): Promise<GitOpsCluster> {
    const queryParams: Record<string, string> = {
      agentIdentifier: data.agentIdentifier!,
    };

    if (data.orgIdentifier) {
      queryParams.orgIdentifier = data.orgIdentifier;
    }

    if (data.projectIdentifier) {
      queryParams.projectIdentifier = data.projectIdentifier;
    }

    return this.client.post<GitOpsCluster>('/gitops/clusters', { cluster: data }, queryParams);
  }

  /**
   * Delete GitOps cluster
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

    return this.client.delete<boolean>(`/gitops/clusters/${identifier}`, queryParams);
  }
}
