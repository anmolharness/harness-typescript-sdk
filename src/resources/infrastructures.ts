/**
 * Infrastructures API
 */

import type { HarnessClient } from '../client.js';
import type {
  Infrastructure,
  CreateInfrastructureRequest,
  UpdateInfrastructureRequest,
  PageResponse,
  ListQueryParams,
} from '../types/index.js';

export class InfrastructuresAPI {
  constructor(private client: HarnessClient) {}

  /**
   * List infrastructures
   */
  async list(
    orgIdentifier: string,
    projectIdentifier: string,
    environmentIdentifier: string,
    params?: ListQueryParams
  ): Promise<PageResponse<Infrastructure>> {
    const queryParams: Record<string, string> = {
      orgIdentifier,
      projectIdentifier,
      environmentIdentifier,
      pageIndex: params?.page?.toString() || '0',
      pageSize: params?.limit?.toString() || '50',
    };

    if (params?.searchTerm) {
      queryParams.searchTerm = params.searchTerm;
    }

    return this.client.get<PageResponse<Infrastructure>>('/infrastructures', queryParams);
  }

  /**
   * Get infrastructure by identifier
   */
  async get(
    orgIdentifier: string,
    projectIdentifier: string,
    environmentIdentifier: string,
    identifier: string
  ): Promise<Infrastructure> {
    return this.client.get<Infrastructure>(`/infrastructures/${identifier}`, {
      orgIdentifier,
      projectIdentifier,
      environmentIdentifier,
    });
  }

  /**
   * Create infrastructure
   */
  async create(data: CreateInfrastructureRequest): Promise<Infrastructure> {
    return this.client.post<Infrastructure>(
      '/infrastructures',
      { infrastructure: data },
      {
        orgIdentifier: data.orgIdentifier,
        projectIdentifier: data.projectIdentifier,
        environmentIdentifier: data.environmentRef,
      }
    );
  }

  /**
   * Update infrastructure
   */
  async update(
    orgIdentifier: string,
    projectIdentifier: string,
    environmentIdentifier: string,
    identifier: string,
    data: UpdateInfrastructureRequest
  ): Promise<Infrastructure> {
    return this.client.put<Infrastructure>(
      `/infrastructures/${identifier}`,
      { infrastructure: data },
      { orgIdentifier, projectIdentifier, environmentIdentifier }
    );
  }

  /**
   * Delete infrastructure
   */
  async delete(
    orgIdentifier: string,
    projectIdentifier: string,
    environmentIdentifier: string,
    identifier: string
  ): Promise<boolean> {
    return this.client.delete<boolean>(`/infrastructures/${identifier}`, {
      orgIdentifier,
      projectIdentifier,
      environmentIdentifier,
    });
  }
}
