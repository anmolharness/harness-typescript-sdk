/**
 * Notification Rules API
 */

import type { HarnessClient } from '../client.js';
import type { PageResponse, ListQueryParams } from '../types/index.js';

export interface NotificationRule {
  identifier: string;
  orgIdentifier?: string;
  projectIdentifier?: string;
  name: string;
  conditions: unknown[];
  channelIdentifiers: string[];
  enabled?: boolean;
}

export class NotificationRulesAPI {
  constructor(private client: HarnessClient) {}

  async list(orgIdentifier?: string, projectIdentifier?: string, params?: ListQueryParams): Promise<PageResponse<NotificationRule>> {
    const queryParams: Record<string, string> = {
      pageIndex: params?.page?.toString() || '0',
      pageSize: params?.limit?.toString() || '50',
    };
    if (orgIdentifier) queryParams.orgIdentifier = orgIdentifier;
    if (projectIdentifier) queryParams.projectIdentifier = projectIdentifier;
    return this.client.get<PageResponse<NotificationRule>>('/notifications/rules', queryParams);
  }

  async create(data: Partial<NotificationRule>): Promise<NotificationRule> {
    const queryParams: Record<string, string> = {};
    if (data.orgIdentifier) queryParams.orgIdentifier = data.orgIdentifier;
    if (data.projectIdentifier) queryParams.projectIdentifier = data.projectIdentifier;
    return this.client.post<NotificationRule>('/notifications/rules', data, queryParams);
  }

  async delete(identifier: string, orgIdentifier?: string, projectIdentifier?: string): Promise<boolean> {
    const queryParams: Record<string, string> = {};
    if (orgIdentifier) queryParams.orgIdentifier = orgIdentifier;
    if (projectIdentifier) queryParams.projectIdentifier = projectIdentifier;
    return this.client.delete<boolean>(`/notifications/rules/${identifier}`, queryParams);
  }
}
