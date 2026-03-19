/**
 * Notification Channels API
 */

import type { HarnessClient } from '../client.js';
import type { PageResponse, ListQueryParams } from '../types/index.js';

export interface NotificationChannel {
  identifier: string;
  orgIdentifier?: string;
  projectIdentifier?: string;
  name: string;
  type: 'Slack' | 'Email' | 'PagerDuty' | 'MsTeams' | 'Webhook';
  config: unknown;
  enabled?: boolean;
}

export class NotificationChannelsAPI {
  constructor(private client: HarnessClient) {}

  async list(orgIdentifier?: string, projectIdentifier?: string, params?: ListQueryParams): Promise<PageResponse<NotificationChannel>> {
    const queryParams: Record<string, string> = {
      pageIndex: params?.page?.toString() || '0',
      pageSize: params?.limit?.toString() || '50',
    };
    if (orgIdentifier) queryParams.orgIdentifier = orgIdentifier;
    if (projectIdentifier) queryParams.projectIdentifier = projectIdentifier;
    return this.client.get<PageResponse<NotificationChannel>>('/notifications/channels', queryParams);
  }

  async create(data: Partial<NotificationChannel>): Promise<NotificationChannel> {
    const queryParams: Record<string, string> = {};
    if (data.orgIdentifier) queryParams.orgIdentifier = data.orgIdentifier;
    if (data.projectIdentifier) queryParams.projectIdentifier = data.projectIdentifier;
    return this.client.post<NotificationChannel>('/notifications/channels', data, queryParams);
  }

  async test(identifier: string, orgIdentifier?: string, projectIdentifier?: string): Promise<{ status: string }> {
    const queryParams: Record<string, string> = {};
    if (orgIdentifier) queryParams.orgIdentifier = orgIdentifier;
    if (projectIdentifier) queryParams.projectIdentifier = projectIdentifier;
    return this.client.post<{ status: string }>(`/notifications/channels/${identifier}/test`, {}, queryParams);
  }

  async delete(identifier: string, orgIdentifier?: string, projectIdentifier?: string): Promise<boolean> {
    const queryParams: Record<string, string> = {};
    if (orgIdentifier) queryParams.orgIdentifier = orgIdentifier;
    if (projectIdentifier) queryParams.projectIdentifier = projectIdentifier;
    return this.client.delete<boolean>(`/notifications/channels/${identifier}`, queryParams);
  }
}
