/**
 * Variables API
 */

import type { HarnessClient } from '../client.js';
import type { Variable, CreateVariableRequest, PageResponse, ListQueryParams } from '../types/index.js';

export class VariablesAPI {
  constructor(private client: HarnessClient) {}

  /**
   * List variables
   */
  async list(orgIdentifier?: string, projectIdentifier?: string, params?: ListQueryParams): Promise<PageResponse<Variable>> {
    const queryParams: Record<string, string> = {
      pageIndex: params?.page?.toString() || '0',
      pageSize: params?.limit?.toString() || '50',
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

    return this.client.get<PageResponse<Variable>>('/variables', queryParams);
  }

  /**
   * Get variable by identifier
   */
  async get(identifier: string, orgIdentifier?: string, projectIdentifier?: string): Promise<Variable> {
    const queryParams: Record<string, string> = {};

    if (orgIdentifier) {
      queryParams.orgIdentifier = orgIdentifier;
    }

    if (projectIdentifier) {
      queryParams.projectIdentifier = projectIdentifier;
    }

    return this.client.get<Variable>(`/variables/${identifier}`, queryParams);
  }

  /**
   * Create variable
   */
  async create(data: CreateVariableRequest): Promise<Variable> {
    const queryParams: Record<string, string> = {};

    if (data.orgIdentifier) {
      queryParams.orgIdentifier = data.orgIdentifier;
    }

    if (data.projectIdentifier) {
      queryParams.projectIdentifier = data.projectIdentifier;
    }

    return this.client.post<Variable>('/variables', { variable: data }, queryParams);
  }

  /**
   * Update variable
   */
  async update(identifier: string, data: Partial<CreateVariableRequest>, orgIdentifier?: string, projectIdentifier?: string): Promise<Variable> {
    const queryParams: Record<string, string> = {};

    if (orgIdentifier) {
      queryParams.orgIdentifier = orgIdentifier;
    }

    if (projectIdentifier) {
      queryParams.projectIdentifier = projectIdentifier;
    }

    return this.client.put<Variable>(`/variables/${identifier}`, { variable: data }, queryParams);
  }

  /**
   * Delete variable
   */
  async delete(identifier: string, orgIdentifier?: string, projectIdentifier?: string): Promise<boolean> {
    const queryParams: Record<string, string> = {};

    if (orgIdentifier) {
      queryParams.orgIdentifier = orgIdentifier;
    }

    if (projectIdentifier) {
      queryParams.projectIdentifier = projectIdentifier;
    }

    return this.client.delete<boolean>(`/variables/${identifier}`, queryParams);
  }
}
