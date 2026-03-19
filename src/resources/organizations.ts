/**
 * Organizations API
 */

import type { HarnessClient } from '../client.js';
import type {
  Organization,
  CreateOrganizationRequest,
  UpdateOrganizationRequest,
  PageResponse,
  ListQueryParams,
} from '../types/index.js';

export class OrganizationsAPI {
  constructor(private client: HarnessClient) {}

  /**
   * List organizations
   */
  async list(params?: ListQueryParams): Promise<PageResponse<Organization>> {
    const queryParams: Record<string, string> = {
      pageIndex: params?.page?.toString() || '0',
      pageSize: params?.limit?.toString() || '50',
    };

    if (params?.searchTerm) {
      queryParams.searchTerm = params.searchTerm;
    }

    if (params?.sort) {
      queryParams.sort = params.sort;
      queryParams.order = params.order || 'ASC';
    }

    return this.client.get<PageResponse<Organization>>('/organizations', queryParams);
  }

  /**
   * Get organization by identifier
   */
  async get(identifier: string): Promise<Organization> {
    return this.client.get<Organization>(`/organizations/${identifier}`);
  }

  /**
   * Create organization
   */
  async create(data: CreateOrganizationRequest): Promise<Organization> {
    return this.client.post<Organization>('/organizations', { organization: data });
  }

  /**
   * Update organization
   */
  async update(identifier: string, data: UpdateOrganizationRequest): Promise<Organization> {
    return this.client.put<Organization>(`/organizations/${identifier}`, { organization: data });
  }

  /**
   * Delete organization
   */
  async delete(identifier: string): Promise<boolean> {
    return this.client.delete<boolean>(`/organizations/${identifier}`);
  }
}
