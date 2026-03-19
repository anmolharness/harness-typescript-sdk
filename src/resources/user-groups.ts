/**
 * User Groups API
 */

import type { HarnessClient } from '../client.js';
import type { UserGroup, CreateUserGroupRequest, PageResponse, ListQueryParams } from '../types/index.js';

export class UserGroupsAPI {
  constructor(private client: HarnessClient) {}

  /**
   * List user groups
   */
  async list(orgIdentifier?: string, projectIdentifier?: string, params?: ListQueryParams): Promise<PageResponse<UserGroup>> {
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

    return this.client.get<PageResponse<UserGroup>>('/user-groups', queryParams);
  }

  /**
   * Get user group by identifier
   */
  async get(identifier: string, orgIdentifier?: string, projectIdentifier?: string): Promise<UserGroup> {
    const queryParams: Record<string, string> = {};

    if (orgIdentifier) {
      queryParams.orgIdentifier = orgIdentifier;
    }

    if (projectIdentifier) {
      queryParams.projectIdentifier = projectIdentifier;
    }

    return this.client.get<UserGroup>(`/user-groups/${identifier}`, queryParams);
  }

  /**
   * Create user group
   */
  async create(data: CreateUserGroupRequest): Promise<UserGroup> {
    const queryParams: Record<string, string> = {};

    if (data.orgIdentifier) {
      queryParams.orgIdentifier = data.orgIdentifier;
    }

    if (data.projectIdentifier) {
      queryParams.projectIdentifier = data.projectIdentifier;
    }

    return this.client.post<UserGroup>('/user-groups', { userGroup: data }, queryParams);
  }

  /**
   * Update user group
   */
  async update(identifier: string, data: Partial<CreateUserGroupRequest>, orgIdentifier?: string, projectIdentifier?: string): Promise<UserGroup> {
    const queryParams: Record<string, string> = {};

    if (orgIdentifier) {
      queryParams.orgIdentifier = orgIdentifier;
    }

    if (projectIdentifier) {
      queryParams.projectIdentifier = projectIdentifier;
    }

    return this.client.put<UserGroup>(`/user-groups/${identifier}`, { userGroup: data }, queryParams);
  }

  /**
   * Delete user group
   */
  async delete(identifier: string, orgIdentifier?: string, projectIdentifier?: string): Promise<boolean> {
    const queryParams: Record<string, string> = {};

    if (orgIdentifier) {
      queryParams.orgIdentifier = orgIdentifier;
    }

    if (projectIdentifier) {
      queryParams.projectIdentifier = projectIdentifier;
    }

    return this.client.delete<boolean>(`/user-groups/${identifier}`, queryParams);
  }
}
