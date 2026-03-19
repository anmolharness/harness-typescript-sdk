/**
 * Connectors API
 */

import type { HarnessClient } from '../client.js';
import type {
  Connector,
  CreateConnectorRequest,
  UpdateConnectorRequest,
  PageResponse,
  ListQueryParams,
} from '../types/index.js';

export class ConnectorsAPI {
  constructor(private client: HarnessClient) {}

  /**
   * List connectors
   */
  async list(orgIdentifier?: string, projectIdentifier?: string, params?: ListQueryParams): Promise<PageResponse<Connector>> {
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

    return this.client.get<PageResponse<Connector>>('/connectors', queryParams);
  }

  /**
   * Get connector by identifier
   */
  async get(identifier: string, orgIdentifier?: string, projectIdentifier?: string): Promise<Connector> {
    const queryParams: Record<string, string> = {};

    if (orgIdentifier) {
      queryParams.orgIdentifier = orgIdentifier;
    }

    if (projectIdentifier) {
      queryParams.projectIdentifier = projectIdentifier;
    }

    return this.client.get<Connector>(`/connectors/${identifier}`, queryParams);
  }

  /**
   * Create connector
   */
  async create(data: CreateConnectorRequest): Promise<Connector> {
    const queryParams: Record<string, string> = {};

    if (data.orgIdentifier) {
      queryParams.orgIdentifier = data.orgIdentifier;
    }

    if (data.projectIdentifier) {
      queryParams.projectIdentifier = data.projectIdentifier;
    }

    return this.client.post<Connector>('/connectors', { connector: data }, queryParams);
  }

  /**
   * Update connector
   */
  async update(identifier: string, data: UpdateConnectorRequest, orgIdentifier?: string, projectIdentifier?: string): Promise<Connector> {
    const queryParams: Record<string, string> = {};

    if (orgIdentifier) {
      queryParams.orgIdentifier = orgIdentifier;
    }

    if (projectIdentifier) {
      queryParams.projectIdentifier = projectIdentifier;
    }

    return this.client.put<Connector>(`/connectors/${identifier}`, { connector: data }, queryParams);
  }

  /**
   * Delete connector
   */
  async delete(identifier: string, orgIdentifier?: string, projectIdentifier?: string): Promise<boolean> {
    const queryParams: Record<string, string> = {};

    if (orgIdentifier) {
      queryParams.orgIdentifier = orgIdentifier;
    }

    if (projectIdentifier) {
      queryParams.projectIdentifier = projectIdentifier;
    }

    return this.client.delete<boolean>(`/connectors/${identifier}`, queryParams);
  }

  /**
   * Test connection
   */
  async testConnection(identifier: string, orgIdentifier?: string, projectIdentifier?: string): Promise<{ status: string }> {
    const queryParams: Record<string, string> = {};

    if (orgIdentifier) {
      queryParams.orgIdentifier = orgIdentifier;
    }

    if (projectIdentifier) {
      queryParams.projectIdentifier = projectIdentifier;
    }

    return this.client.post<{ status: string }>(`/connectors/testConnection/${identifier}`, undefined, queryParams);
  }
}
