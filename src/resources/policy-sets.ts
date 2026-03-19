/**
 * Policy Sets API
 */

import type { HarnessClient } from '../client.js';
import type { PolicySet, PageResponse, ListQueryParams } from '../types/index.js';

export class PolicySetsAPI {
  constructor(private client: HarnessClient) {}

  /**
   * List policy sets
   */
  async list(orgIdentifier?: string, projectIdentifier?: string, params?: ListQueryParams): Promise<PageResponse<PolicySet>> {
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

    if (params?.searchTerm) {
      queryParams.searchTerm = params.searchTerm;
    }

    return this.client.get<PageResponse<PolicySet>>('/pm/api/v1/policies/sets', queryParams);
  }

  /**
   * Get policy set
   */
  async get(identifier: string, orgIdentifier?: string, projectIdentifier?: string): Promise<PolicySet> {
    const queryParams: Record<string, string> = {};

    if (orgIdentifier) {
      queryParams.orgIdentifier = orgIdentifier;
    }

    if (projectIdentifier) {
      queryParams.projectIdentifier = projectIdentifier;
    }

    return this.client.get<PolicySet>(`/pm/api/v1/policies/sets/${identifier}`, queryParams);
  }

  /**
   * Create policy set
   */
  async create(data: Partial<PolicySet>): Promise<PolicySet> {
    const queryParams: Record<string, string> = {};

    if (data.orgIdentifier) {
      queryParams.orgIdentifier = data.orgIdentifier;
    }

    if (data.projectIdentifier) {
      queryParams.projectIdentifier = data.projectIdentifier;
    }

    return this.client.post<PolicySet>('/pm/api/v1/policies/sets', { policySet: data }, queryParams);
  }

  /**
   * Update policy set
   */
  async update(identifier: string, data: Partial<PolicySet>, orgIdentifier?: string, projectIdentifier?: string): Promise<PolicySet> {
    const queryParams: Record<string, string> = {};

    if (orgIdentifier) {
      queryParams.orgIdentifier = orgIdentifier;
    }

    if (projectIdentifier) {
      queryParams.projectIdentifier = projectIdentifier;
    }

    return this.client.put<PolicySet>(`/pm/api/v1/policies/sets/${identifier}`, { policySet: data }, queryParams);
  }

  /**
   * Delete policy set
   */
  async delete(identifier: string, orgIdentifier?: string, projectIdentifier?: string): Promise<boolean> {
    const queryParams: Record<string, string> = {};

    if (orgIdentifier) {
      queryParams.orgIdentifier = orgIdentifier;
    }

    if (projectIdentifier) {
      queryParams.projectIdentifier = projectIdentifier;
    }

    return this.client.delete<boolean>(`/pm/api/v1/policies/sets/${identifier}`, queryParams);
  }
}
