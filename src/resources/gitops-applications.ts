/**
 * GitOps Applications API
 */

import type { HarnessClient } from '../client.js';
import type { GitOpsApplication, PageResponse, ListQueryParams } from '../types/index.js';

export class GitOpsApplicationsAPI {
  constructor(private client: HarnessClient) {}

  /**
   * List GitOps applications
   */
  async list(agentIdentifier: string, orgIdentifier?: string, projectIdentifier?: string, params?: ListQueryParams): Promise<PageResponse<GitOpsApplication>> {
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

    return this.client.get<PageResponse<GitOpsApplication>>('/gitops/applications', queryParams);
  }

  /**
   * Get GitOps application
   */
  async get(agentIdentifier: string, identifier: string, orgIdentifier?: string, projectIdentifier?: string): Promise<GitOpsApplication> {
    const queryParams: Record<string, string> = {
      agentIdentifier,
    };

    if (orgIdentifier) {
      queryParams.orgIdentifier = orgIdentifier;
    }

    if (projectIdentifier) {
      queryParams.projectIdentifier = projectIdentifier;
    }

    return this.client.get<GitOpsApplication>(`/gitops/applications/${identifier}`, queryParams);
  }

  /**
   * Create GitOps application
   */
  async create(data: Partial<GitOpsApplication>): Promise<GitOpsApplication> {
    const queryParams: Record<string, string> = {
      agentIdentifier: data.agentIdentifier!,
    };

    if (data.orgIdentifier) {
      queryParams.orgIdentifier = data.orgIdentifier;
    }

    if (data.projectIdentifier) {
      queryParams.projectIdentifier = data.projectIdentifier;
    }

    return this.client.post<GitOpsApplication>('/gitops/applications', { application: data }, queryParams);
  }

  /**
   * Delete GitOps application
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

    return this.client.delete<boolean>(`/gitops/applications/${identifier}`, queryParams);
  }

  /**
   * Sync GitOps application
   */
  async sync(agentIdentifier: string, identifier: string, orgIdentifier?: string, projectIdentifier?: string): Promise<unknown> {
    const queryParams: Record<string, string> = {
      agentIdentifier,
    };

    if (orgIdentifier) {
      queryParams.orgIdentifier = orgIdentifier;
    }

    if (projectIdentifier) {
      queryParams.projectIdentifier = projectIdentifier;
    }

    return this.client.post<unknown>(`/gitops/applications/${identifier}/sync`, {}, queryParams);
  }
}
