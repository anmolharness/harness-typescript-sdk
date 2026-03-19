/**
 * Variable Sets API
 */

import type { HarnessClient } from '../client.js';
import type { VariableSet, PageResponse, ListQueryParams } from '../types/index.js';

export class VariableSetsAPI {
  constructor(private client: HarnessClient) {}

  async list(orgIdentifier?: string, projectIdentifier?: string, params?: ListQueryParams): Promise<PageResponse<VariableSet>> {
    const queryParams: Record<string, string> = {
      pageIndex: params?.page?.toString() || '0',
      pageSize: params?.limit?.toString() || '50',
    };
    if (orgIdentifier) queryParams.orgIdentifier = orgIdentifier;
    if (projectIdentifier) queryParams.projectIdentifier = projectIdentifier;
    return this.client.get<PageResponse<VariableSet>>('/variable-sets', queryParams);
  }

  async get(identifier: string, orgIdentifier?: string, projectIdentifier?: string): Promise<VariableSet> {
    const queryParams: Record<string, string> = {};
    if (orgIdentifier) queryParams.orgIdentifier = orgIdentifier;
    if (projectIdentifier) queryParams.projectIdentifier = projectIdentifier;
    return this.client.get<VariableSet>(`/variable-sets/${identifier}`, queryParams);
  }

  async create(data: Partial<VariableSet>): Promise<VariableSet> {
    const queryParams: Record<string, string> = {};
    if (data.orgIdentifier) queryParams.orgIdentifier = data.orgIdentifier;
    if (data.projectIdentifier) queryParams.projectIdentifier = data.projectIdentifier;
    return this.client.post<VariableSet>('/variable-sets', { variableSet: data }, queryParams);
  }

  async delete(identifier: string, orgIdentifier?: string, projectIdentifier?: string): Promise<boolean> {
    const queryParams: Record<string, string> = {};
    if (orgIdentifier) queryParams.orgIdentifier = orgIdentifier;
    if (projectIdentifier) queryParams.projectIdentifier = projectIdentifier;
    return this.client.delete<boolean>(`/variable-sets/${identifier}`, queryParams);
  }
}
