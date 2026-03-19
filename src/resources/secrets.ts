/**
 * Secrets API
 */

import type { HarnessClient } from '../client.js';
import type {
  Secret,
  CreateSecretRequest,
  UpdateSecretRequest,
  PageResponse,
  ListQueryParams,
} from '../types/index.js';

export class SecretsAPI {
  constructor(private client: HarnessClient) {}

  /**
   * List secrets
   */
  async list(orgIdentifier?: string, projectIdentifier?: string, params?: ListQueryParams): Promise<PageResponse<Secret>> {
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

    return this.client.get<PageResponse<Secret>>('/v2/secrets', queryParams);
  }

  /**
   * Get secret by identifier
   */
  async get(identifier: string, orgIdentifier?: string, projectIdentifier?: string): Promise<Secret> {
    const queryParams: Record<string, string> = {};

    if (orgIdentifier) {
      queryParams.orgIdentifier = orgIdentifier;
    }

    if (projectIdentifier) {
      queryParams.projectIdentifier = projectIdentifier;
    }

    return this.client.get<Secret>(`/v2/secrets/${identifier}`, queryParams);
  }

  /**
   * Create secret
   */
  async create(data: CreateSecretRequest): Promise<Secret> {
    const queryParams: Record<string, string> = {};

    if (data.orgIdentifier) {
      queryParams.orgIdentifier = data.orgIdentifier;
    }

    if (data.projectIdentifier) {
      queryParams.projectIdentifier = data.projectIdentifier;
    }

    return this.client.post<Secret>('/v2/secrets', { secret: data }, queryParams);
  }

  /**
   * Update secret
   */
  async update(identifier: string, data: UpdateSecretRequest, orgIdentifier?: string, projectIdentifier?: string): Promise<Secret> {
    const queryParams: Record<string, string> = {};

    if (orgIdentifier) {
      queryParams.orgIdentifier = orgIdentifier;
    }

    if (projectIdentifier) {
      queryParams.projectIdentifier = projectIdentifier;
    }

    return this.client.put<Secret>(`/v2/secrets/${identifier}`, { secret: data }, queryParams);
  }

  /**
   * Delete secret
   */
  async delete(identifier: string, orgIdentifier?: string, projectIdentifier?: string): Promise<boolean> {
    const queryParams: Record<string, string> = {};

    if (orgIdentifier) {
      queryParams.orgIdentifier = orgIdentifier;
    }

    if (projectIdentifier) {
      queryParams.projectIdentifier = projectIdentifier;
    }

    return this.client.delete<boolean>(`/v2/secrets/${identifier}`, queryParams);
  }
}
