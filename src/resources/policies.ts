/**
 * Policies API
 */

import type { HarnessClient } from '../client.js';
import type { Policy, PageResponse, ListQueryParams } from '../types/index.js';

export class PoliciesAPI {
  constructor(private client: HarnessClient) {}

  async list(orgIdentifier?: string, projectIdentifier?: string, params?: ListQueryParams): Promise<PageResponse<Policy>> {
    const queryParams: Record<string, string> = {
      page: params?.page?.toString() || '0',
      size: params?.limit?.toString() || '50',
    };
    if (orgIdentifier) queryParams.orgIdentifier = orgIdentifier;
    if (projectIdentifier) queryParams.projectIdentifier = projectIdentifier;
    return this.client.get<PageResponse<Policy>>('/pm/api/v1/policies', queryParams);
  }

  async create(data: Partial<Policy>): Promise<Policy> {
    const queryParams: Record<string, string> = {};
    if (data.orgIdentifier) queryParams.orgIdentifier = data.orgIdentifier;
    if (data.projectIdentifier) queryParams.projectIdentifier = data.projectIdentifier;
    return this.client.post<Policy>('/pm/api/v1/policies', { policy: data }, queryParams);
  }

  async update(identifier: string, data: Partial<Policy>, orgIdentifier?: string, projectIdentifier?: string): Promise<Policy> {
    const queryParams: Record<string, string> = {};
    if (orgIdentifier) queryParams.orgIdentifier = orgIdentifier;
    if (projectIdentifier) queryParams.projectIdentifier = projectIdentifier;
    return this.client.put<Policy>(`/pm/api/v1/policies/${identifier}`, { policy: data }, queryParams);
  }

  async delete(identifier: string, orgIdentifier?: string, projectIdentifier?: string): Promise<boolean> {
    const queryParams: Record<string, string> = {};
    if (orgIdentifier) queryParams.orgIdentifier = orgIdentifier;
    if (projectIdentifier) queryParams.projectIdentifier = projectIdentifier;
    return this.client.delete<boolean>(`/pm/api/v1/policies/${identifier}`, queryParams);
  }
}
