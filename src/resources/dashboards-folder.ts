/**
 * Dashboards Folder API
 */

import type { HarnessClient } from '../client.js';

export interface DashboardFolder {
  identifier: string;
  name: string;
  parentIdentifier?: string;
}

export class DashboardsFolderAPI {
  constructor(private client: HarnessClient) {}

  async list(): Promise<DashboardFolder[]> {
    return this.client.get<DashboardFolder[]>('/dashboards/folders');
  }

  async create(data: Partial<DashboardFolder>): Promise<DashboardFolder> {
    return this.client.post<DashboardFolder>('/dashboards/folders', data);
  }

  async delete(identifier: string): Promise<boolean> {
    return this.client.delete<boolean>(`/dashboards/folders/${identifier}`);
  }
}
