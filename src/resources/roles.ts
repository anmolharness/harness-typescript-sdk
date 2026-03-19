/**
 * Roles API
 */

import type { HarnessClient } from '../client.js';
import type { Role, CreateRoleRequest, PageResponse, ListQueryParams } from '../types/index.js';

export class RolesAPI {
  constructor(private client: HarnessClient) {}

  /**
   * List roles
   */
  async list(orgIdentifier?: string, projectIdentifier?: string, params?: ListQueryParams): Promise<PageResponse<Role>> {
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

    return this.client.get<PageResponse<Role>>('/roles', queryParams);
  }

  /**
   * Get role by identifier
   */
  async get(identifier: string, orgIdentifier?: string, projectIdentifier?: string): Promise<Role> {
    const queryParams: Record<string, string> = {};

    if (orgIdentifier) {
      queryParams.orgIdentifier = orgIdentifier;
    }

    if (projectIdentifier) {
      queryParams.projectIdentifier = projectIdentifier;
    }

    return this.client.get<Role>(`/roles/${identifier}`, queryParams);
  }

  /**
   * Create role
   */
  async create(data: CreateRoleRequest): Promise<Role> {
    const queryParams: Record<string, string> = {};

    if (data.orgIdentifier) {
      queryParams.orgIdentifier = data.orgIdentifier;
    }

    if (data.projectIdentifier) {
      queryParams.projectIdentifier = data.projectIdentifier;
    }

    return this.client.post<Role>('/roles', { role: data }, queryParams);
  }

  /**
   * Update role
   */
  async update(identifier: string, data: Partial<CreateRoleRequest>, orgIdentifier?: string, projectIdentifier?: string): Promise<Role> {
    const queryParams: Record<string, string> = {};

    if (orgIdentifier) {
      queryParams.orgIdentifier = orgIdentifier;
    }

    if (projectIdentifier) {
      queryParams.projectIdentifier = projectIdentifier;
    }

    return this.client.put<Role>(`/roles/${identifier}`, { role: data }, queryParams);
  }

  /**
   * Delete role
   */
  async delete(identifier: string, orgIdentifier?: string, projectIdentifier?: string): Promise<boolean> {
    const queryParams: Record<string, string> = {};

    if (orgIdentifier) {
      queryParams.orgIdentifier = orgIdentifier;
    }

    if (projectIdentifier) {
      queryParams.projectIdentifier = projectIdentifier;
    }

    return this.client.delete<boolean>(`/roles/${identifier}`, queryParams);
  }
}
