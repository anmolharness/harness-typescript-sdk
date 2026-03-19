/**
 * Role Assignments API
 */

import type { HarnessClient } from '../client.js';
import type { RoleAssignment, CreateRoleAssignmentRequest, PageResponse, ListQueryParams } from '../types/index.js';

export class RoleAssignmentsAPI {
  constructor(private client: HarnessClient) {}

  /**
   * List role assignments
   */
  async list(orgIdentifier?: string, projectIdentifier?: string, params?: ListQueryParams): Promise<PageResponse<RoleAssignment>> {
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

    return this.client.get<PageResponse<RoleAssignment>>('/roleassignments', queryParams);
  }

  /**
   * Get role assignment by identifier
   */
  async get(identifier: string, orgIdentifier?: string, projectIdentifier?: string): Promise<RoleAssignment> {
    const queryParams: Record<string, string> = {};

    if (orgIdentifier) {
      queryParams.orgIdentifier = orgIdentifier;
    }

    if (projectIdentifier) {
      queryParams.projectIdentifier = projectIdentifier;
    }

    return this.client.get<RoleAssignment>(`/roleassignments/${identifier}`, queryParams);
  }

  /**
   * Create role assignment
   */
  async create(data: CreateRoleAssignmentRequest, orgIdentifier?: string, projectIdentifier?: string): Promise<RoleAssignment> {
    const queryParams: Record<string, string> = {};

    if (orgIdentifier) {
      queryParams.orgIdentifier = orgIdentifier;
    }

    if (projectIdentifier) {
      queryParams.projectIdentifier = projectIdentifier;
    }

    return this.client.post<RoleAssignment>('/roleassignments', { roleAssignment: data }, queryParams);
  }

  /**
   * Delete role assignment
   */
  async delete(identifier: string, orgIdentifier?: string, projectIdentifier?: string): Promise<boolean> {
    const queryParams: Record<string, string> = {};

    if (orgIdentifier) {
      queryParams.orgIdentifier = orgIdentifier;
    }

    if (projectIdentifier) {
      queryParams.projectIdentifier = projectIdentifier;
    }

    return this.client.delete<boolean>(`/roleassignments/${identifier}`, queryParams);
  }
}
