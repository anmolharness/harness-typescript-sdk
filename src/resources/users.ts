/**
 * Users API
 */

import type { HarnessClient } from '../client.js';
import type { User, PageResponse, ListQueryParams } from '../types/index.js';

export class UsersAPI {
  constructor(private client: HarnessClient) {}

  /**
   * List users
   */
  async list(orgIdentifier?: string, projectIdentifier?: string, params?: ListQueryParams): Promise<PageResponse<User>> {
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

    return this.client.get<PageResponse<User>>('/users', queryParams);
  }

  /**
   * Get user by ID
   */
  async get(userId: string): Promise<User> {
    return this.client.get<User>(`/users/${userId}`);
  }

  /**
   * Add user to account/org/project
   */
  async addUser(
    email: string,
    roleAssignments: Array<{ roleIdentifier: string; resourceGroupIdentifier: string }>,
    orgIdentifier?: string,
    projectIdentifier?: string
  ): Promise<User> {
    const queryParams: Record<string, string> = {};

    if (orgIdentifier) {
      queryParams.orgIdentifier = orgIdentifier;
    }

    if (projectIdentifier) {
      queryParams.projectIdentifier = projectIdentifier;
    }

    return this.client.post<User>('/users', { users: [email], roleBindings: roleAssignments }, queryParams);
  }

  /**
   * Remove user
   */
  async remove(userId: string, orgIdentifier?: string, projectIdentifier?: string): Promise<boolean> {
    const queryParams: Record<string, string> = {};

    if (orgIdentifier) {
      queryParams.orgIdentifier = orgIdentifier;
    }

    if (projectIdentifier) {
      queryParams.projectIdentifier = projectIdentifier;
    }

    return this.client.delete<boolean>(`/users/${userId}`, queryParams);
  }
}
