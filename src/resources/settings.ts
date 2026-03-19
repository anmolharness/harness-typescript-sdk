/**
 * Settings API
 */

import type { HarnessClient } from '../client.js';
import type { Setting, PageResponse, ListQueryParams } from '../types/index.js';

export class SettingsAPI {
  constructor(private client: HarnessClient) {}

  async list(orgIdentifier?: string, projectIdentifier?: string, params?: ListQueryParams): Promise<PageResponse<Setting>> {
    const queryParams: Record<string, string> = {
      pageIndex: params?.page?.toString() || '0',
      pageSize: params?.limit?.toString() || '50',
    };
    if (orgIdentifier) queryParams.orgIdentifier = orgIdentifier;
    if (projectIdentifier) queryParams.projectIdentifier = projectIdentifier;
    return this.client.get<PageResponse<Setting>>('/settings', queryParams);
  }

  async get(identifier: string, orgIdentifier?: string, projectIdentifier?: string): Promise<Setting> {
    const queryParams: Record<string, string> = {};
    if (orgIdentifier) queryParams.orgIdentifier = orgIdentifier;
    if (projectIdentifier) queryParams.projectIdentifier = projectIdentifier;
    return this.client.get<Setting>(`/settings/${identifier}`, queryParams);
  }

  async update(identifier: string, value: string | boolean | number, orgIdentifier?: string, projectIdentifier?: string): Promise<Setting> {
    const queryParams: Record<string, string> = {};
    if (orgIdentifier) queryParams.orgIdentifier = orgIdentifier;
    if (projectIdentifier) queryParams.projectIdentifier = projectIdentifier;
    return this.client.put<Setting>(`/settings/${identifier}`, { value }, queryParams);
  }
}
