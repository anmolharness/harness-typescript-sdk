/**
 * Dashboards API
 */

import type { HarnessClient } from '../client.js';
import type { Dashboard, PageResponse, ListQueryParams } from '../types/index.js';

export class DashboardsAPI {
  constructor(private client: HarnessClient) {}

  async list(orgIdentifier?: string, projectIdentifier?: string, params?: ListQueryParams): Promise<PageResponse<Dashboard>> {
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

    return this.client.get<PageResponse<Dashboard>>('/dashboards', queryParams);
  }

  async get(identifier: string, orgIdentifier?: string, projectIdentifier?: string): Promise<Dashboard> {
    const queryParams: Record<string, string> = {};

    if (orgIdentifier) {
      queryParams.orgIdentifier = orgIdentifier;
    }

    if (projectIdentifier) {
      queryParams.projectIdentifier = projectIdentifier;
    }

    return this.client.get<Dashboard>(`/dashboards/${identifier}`, queryParams);
  }

  async create(data: Partial<Dashboard>): Promise<Dashboard> {
    const queryParams: Record<string, string> = {};

    if (data.orgIdentifier) {
      queryParams.orgIdentifier = data.orgIdentifier;
    }

    if (data.projectIdentifier) {
      queryParams.projectIdentifier = data.projectIdentifier;
    }

    return this.client.post<Dashboard>('/dashboards', { dashboard: data }, queryParams);
  }

  async delete(identifier: string, orgIdentifier?: string, projectIdentifier?: string): Promise<boolean> {
    const queryParams: Record<string, string> = {};

    if (orgIdentifier) {
      queryParams.orgIdentifier = orgIdentifier;
    }

    if (projectIdentifier) {
      queryParams.projectIdentifier = projectIdentifier;
    }

    return this.client.delete<boolean>(`/dashboards/${identifier}`, queryParams);
  }
}
