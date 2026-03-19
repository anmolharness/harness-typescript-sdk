/**
 * Monitored Services API
 */

import type { HarnessClient } from '../client.js';
import type { MonitoredService, PageResponse, ListQueryParams } from '../types/index.js';

export class MonitoredServicesAPI {
  constructor(private client: HarnessClient) {}

  async list(orgIdentifier: string, projectIdentifier: string, params?: ListQueryParams): Promise<PageResponse<MonitoredService>> {
    const queryParams: Record<string, string> = {
      orgIdentifier,
      projectIdentifier,
      pageIndex: params?.page?.toString() || '0',
      pageSize: params?.limit?.toString() || '50',
    };

    return this.client.get<PageResponse<MonitoredService>>('/cv/api/monitored-service', queryParams);
  }

  async get(orgIdentifier: string, projectIdentifier: string, identifier: string): Promise<MonitoredService> {
    return this.client.get<MonitoredService>(`/cv/api/monitored-service/${identifier}`, {
      orgIdentifier,
      projectIdentifier,
    });
  }

  async create(data: Partial<MonitoredService>): Promise<MonitoredService> {
    return this.client.post<MonitoredService>(
      '/cv/api/monitored-service',
      { monitoredService: data },
      {
        orgIdentifier: data.orgIdentifier!,
        projectIdentifier: data.projectIdentifier!,
      }
    );
  }

  async update(orgIdentifier: string, projectIdentifier: string, identifier: string, data: Partial<MonitoredService>): Promise<MonitoredService> {
    return this.client.put<MonitoredService>(
      `/cv/api/monitored-service/${identifier}`,
      { monitoredService: data },
      { orgIdentifier, projectIdentifier }
    );
  }

  async delete(orgIdentifier: string, projectIdentifier: string, identifier: string): Promise<boolean> {
    return this.client.delete<boolean>(`/cv/api/monitored-service/${identifier}`, {
      orgIdentifier,
      projectIdentifier,
    });
  }
}
