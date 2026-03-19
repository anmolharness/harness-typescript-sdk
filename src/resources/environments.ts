/**
 * Environments API
 */

import type { HarnessClient } from '../client.js';
import type {
  Environment,
  CreateEnvironmentRequest,
  UpdateEnvironmentRequest,
  PageResponse,
  ListQueryParams,
} from '../types/index.js';

export class EnvironmentsAPI {
  constructor(private client: HarnessClient) {}

  /**
   * List environments
   */
  async list(
    orgIdentifier: string,
    projectIdentifier: string,
    params?: ListQueryParams
  ): Promise<PageResponse<Environment>> {
    const queryParams: Record<string, string> = {
      orgIdentifier,
      projectIdentifier,
      pageIndex: params?.page?.toString() || '0',
      pageSize: params?.limit?.toString() || '50',
    };

    if (params?.searchTerm) {
      queryParams.searchTerm = params.searchTerm;
    }

    return this.client.get<PageResponse<Environment>>('/environmentsV2', queryParams);
  }

  /**
   * Get environment by identifier
   */
  async get(orgIdentifier: string, projectIdentifier: string, identifier: string): Promise<Environment> {
    return this.client.get<Environment>(`/environmentsV2/${identifier}`, { orgIdentifier, projectIdentifier });
  }

  /**
   * Create environment
   */
  async create(data: CreateEnvironmentRequest): Promise<Environment> {
    return this.client.post<Environment>(
      '/environmentsV2',
      { environment: data },
      { orgIdentifier: data.orgIdentifier, projectIdentifier: data.projectIdentifier }
    );
  }

  /**
   * Update environment
   */
  async update(
    orgIdentifier: string,
    projectIdentifier: string,
    identifier: string,
    data: UpdateEnvironmentRequest
  ): Promise<Environment> {
    return this.client.put<Environment>(
      `/environmentsV2/${identifier}`,
      { environment: data },
      { orgIdentifier, projectIdentifier }
    );
  }

  /**
   * Delete environment
   */
  async delete(orgIdentifier: string, projectIdentifier: string, identifier: string): Promise<boolean> {
    return this.client.delete<boolean>(`/environmentsV2/${identifier}`, { orgIdentifier, projectIdentifier });
  }
}
