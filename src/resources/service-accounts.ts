/**
 * Service Accounts API
 */

import type { HarnessClient } from '../client.js';
import type {
  ServiceAccount,
  CreateServiceAccountRequest,
  UpdateServiceAccountRequest,
  PageResponse,
  ListQueryParams,
} from '../types/index.js';

export class ServiceAccountsAPI {
  constructor(private client: HarnessClient) {}

  /**
   * List service accounts
   */
  async list(orgIdentifier?: string, projectIdentifier?: string, params?: ListQueryParams): Promise<PageResponse<ServiceAccount>> {
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

    return this.client.get<PageResponse<ServiceAccount>>('/serviceaccount', queryParams);
  }

  /**
   * Get service account by identifier
   */
  async get(identifier: string, orgIdentifier?: string, projectIdentifier?: string): Promise<ServiceAccount> {
    const queryParams: Record<string, string> = {};

    if (orgIdentifier) {
      queryParams.orgIdentifier = orgIdentifier;
    }

    if (projectIdentifier) {
      queryParams.projectIdentifier = projectIdentifier;
    }

    return this.client.get<ServiceAccount>(`/serviceaccount/${identifier}`, queryParams);
  }

  /**
   * Create service account
   */
  async create(data: CreateServiceAccountRequest): Promise<ServiceAccount> {
    const queryParams: Record<string, string> = {};

    if (data.orgIdentifier) {
      queryParams.orgIdentifier = data.orgIdentifier;
    }

    if (data.projectIdentifier) {
      queryParams.projectIdentifier = data.projectIdentifier;
    }

    return this.client.post<ServiceAccount>('/serviceaccount', { serviceAccount: data }, queryParams);
  }

  /**
   * Update service account
   */
  async update(identifier: string, data: UpdateServiceAccountRequest, orgIdentifier?: string, projectIdentifier?: string): Promise<ServiceAccount> {
    const queryParams: Record<string, string> = {};

    if (orgIdentifier) {
      queryParams.orgIdentifier = orgIdentifier;
    }

    if (projectIdentifier) {
      queryParams.projectIdentifier = projectIdentifier;
    }

    return this.client.put<ServiceAccount>(`/serviceaccount/${identifier}`, { serviceAccount: data }, queryParams);
  }

  /**
   * Delete service account
   */
  async delete(identifier: string, orgIdentifier?: string, projectIdentifier?: string): Promise<boolean> {
    const queryParams: Record<string, string> = {};

    if (orgIdentifier) {
      queryParams.orgIdentifier = orgIdentifier;
    }

    if (projectIdentifier) {
      queryParams.projectIdentifier = projectIdentifier;
    }

    return this.client.delete<boolean>(`/serviceaccount/${identifier}`, queryParams);
  }
}
