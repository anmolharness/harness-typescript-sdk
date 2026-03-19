/**
 * Notification Templates API
 */

import type { HarnessClient } from '../client.js';

export interface NotificationTemplate {
  identifier: string;
  name: string;
  scope: 'account' | 'org' | 'project';
  subject?: string;
  body: string;
  variables?: string[];
}

export class NotificationTemplatesAPI {
  constructor(private client: HarnessClient) {}

  async list(scope: 'account' | 'org' | 'project', orgIdentifier?: string, projectIdentifier?: string): Promise<NotificationTemplate[]> {
    const queryParams: Record<string, string> = { scope };
    if (orgIdentifier) queryParams.orgIdentifier = orgIdentifier;
    if (projectIdentifier) queryParams.projectIdentifier = projectIdentifier;
    return this.client.get<NotificationTemplate[]>('/notifications/templates', queryParams);
  }

  async create(data: Partial<NotificationTemplate>, orgIdentifier?: string, projectIdentifier?: string): Promise<NotificationTemplate> {
    const queryParams: Record<string, string> = {};
    if (orgIdentifier) queryParams.orgIdentifier = orgIdentifier;
    if (projectIdentifier) queryParams.projectIdentifier = projectIdentifier;
    return this.client.post<NotificationTemplate>('/notifications/templates', data, queryParams);
  }

  async delete(identifier: string, scope: 'account' | 'org' | 'project', orgIdentifier?: string, projectIdentifier?: string): Promise<boolean> {
    const queryParams: Record<string, string> = { scope };
    if (orgIdentifier) queryParams.orgIdentifier = orgIdentifier;
    if (projectIdentifier) queryParams.projectIdentifier = projectIdentifier;
    return this.client.delete<boolean>(`/notifications/templates/${identifier}`, queryParams);
  }
}
