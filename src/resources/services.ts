/**
 * Services API
 */

import type { HarnessClient } from '../client.js';
import type {
  Service,
  CreateServiceRequest,
  UpdateServiceRequest,
  PageResponse,
  ListQueryParams,
} from '../types/index.js';

export class ServicesAPI {
  constructor(private client: HarnessClient) {}

  /**
   * List services
   */
  async list(orgIdentifier: string, projectIdentifier: string, params?: ListQueryParams): Promise<PageResponse<Service>> {
    const queryParams: Record<string, string> = {
      orgIdentifier,
      projectIdentifier,
      pageIndex: params?.page?.toString() || '0',
      pageSize: params?.limit?.toString() || '50',
    };

    if (params?.searchTerm) {
      queryParams.searchTerm = params.searchTerm;
    }

    return this.client.get<PageResponse<Service>>('/servicesV2', queryParams);
  }

  /**
   * Get service by identifier
   */
  async get(orgIdentifier: string, projectIdentifier: string, identifier: string): Promise<Service> {
    return this.client.get<Service>(`/servicesV2/${identifier}`, { orgIdentifier, projectIdentifier });
  }

  /**
   * Create service
   */
  async create(data: CreateServiceRequest): Promise<Service> {
    return this.client.post<Service>(
      '/servicesV2',
      { service: data },
      { orgIdentifier: data.orgIdentifier, projectIdentifier: data.projectIdentifier }
    );
  }

  /**
   * Update service
   */
  async update(
    orgIdentifier: string,
    projectIdentifier: string,
    identifier: string,
    data: UpdateServiceRequest
  ): Promise<Service> {
    return this.client.put<Service>(`/servicesV2/${identifier}`, { service: data }, { orgIdentifier, projectIdentifier });
  }

  /**
   * Delete service
   */
  async delete(orgIdentifier: string, projectIdentifier: string, identifier: string): Promise<boolean> {
    return this.client.delete<boolean>(`/servicesV2/${identifier}`, { orgIdentifier, projectIdentifier });
  }
}
