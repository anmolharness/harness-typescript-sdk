/**
 * Resource Groups API
 */

import type { HarnessClient } from '../client.js';
import type { ResourceGroup, PageResponse, ListQueryParams } from '../types/index.js';

export class ResourceGroupsAPI {
  constructor(private client: HarnessClient) {}

  async list(orgIdentifier?: string, projectIdentifier?: string, params?: ListQueryParams): Promise<PageResponse<ResourceGroup>> {
    const queryParams: Record<string, string> = {
      pageIndex: params?.page?.toString() || '0',
      pageSize: params?.limit?.toString() || '50',
    };

    if (orgIdentifier) queryParams.orgIdentifier = orgIdentifier;
    if (projectIdentifier) queryParams.projectIdentifier = projectIdentifier;
    if (params?.searchTerm) queryParams.searchTerm = params.searchTerm;

    return this.client.get<PageResponse<ResourceGroup>>('/resourcegroup', queryParams);
  }

  async get(identifier: string, orgIdentifier?: string, projectIdentifier?: string): Promise<ResourceGroup> {
    const queryParams: Record<string, string> = {};
    if (orgIdentifier) queryParams.orgIdentifier = orgIdentifier;
    if (projectIdentifier) queryParams.projectIdentifier = projectIdentifier;
    return this.client.get<ResourceGroup>(`/resourcegroup/${identifier}`, queryParams);
  }

  async create(data: Partial<ResourceGroup>): Promise<ResourceGroup> {
    const queryParams: Record<string, string> = {};
    if (data.orgIdentifier) queryParams.orgIdentifier = data.orgIdentifier;
    if (data.projectIdentifier) queryParams.projectIdentifier = data.projectIdentifier;
    return this.client.post<ResourceGroup>('/resourcegroup', { resourceGroup: data }, queryParams);
  }

  async update(identifier: string, data: Partial<ResourceGroup>, orgIdentifier?: string, projectIdentifier?: string): Promise<ResourceGroup> {
    const queryParams: Record<string, string> = {};
    if (orgIdentifier) queryParams.orgIdentifier = orgIdentifier;
    if (projectIdentifier) queryParams.projectIdentifier = projectIdentifier;
    return this.client.put<ResourceGroup>(`/resourcegroup/${identifier}`, { resourceGroup: data }, queryParams);
  }

  async delete(identifier: string, orgIdentifier?: string, projectIdentifier?: string): Promise<boolean> {
    const queryParams: Record<string, string> = {};
    if (orgIdentifier) queryParams.orgIdentifier = orgIdentifier;
    if (projectIdentifier) queryParams.projectIdentifier = projectIdentifier;
    return this.client.delete<boolean>(`/resourcegroup/${identifier}`, queryParams);
  }
}
