/**
 * Dashboards Filter API
 */

import type { HarnessClient } from '../client.js';

export interface DashboardFilter {
  identifier: string;
  name: string;
  filterProperties: unknown;
}

export class DashboardsFilterAPI {
  constructor(private client: HarnessClient) {}

  async list(dashboardId: string): Promise<DashboardFilter[]> {
    return this.client.get<DashboardFilter[]>(`/dashboards/${dashboardId}/filters`);
  }

  async create(dashboardId: string, data: Partial<DashboardFilter>): Promise<DashboardFilter> {
    return this.client.post<DashboardFilter>(`/dashboards/${dashboardId}/filters`, data);
  }

  async delete(dashboardId: string, filterId: string): Promise<boolean> {
    return this.client.delete<boolean>(`/dashboards/${dashboardId}/filters/${filterId}`);
  }
}
