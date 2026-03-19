/**
 * Webhook Triggers API
 */

import type { HarnessClient } from '../client.js';

export interface WebhookTrigger {
  identifier: string;
  name: string;
  type: 'Github' | 'Gitlab' | 'Bitbucket' | 'Custom';
  webhookUrl?: string;
  enabled?: boolean;
  orgIdentifier?: string;
  projectIdentifier?: string;
}

export class WebhookTriggersAPI {
  constructor(private client: HarnessClient) {}

  async list(orgIdentifier: string, projectIdentifier: string): Promise<WebhookTrigger[]> {
    return this.client.get<WebhookTrigger[]>('/pipeline/api/webhook-triggers', {
      orgIdentifier,
      projectIdentifier,
    });
  }

  async process(webhookId: string, payload: unknown): Promise<{ status: string }> {
    return this.client.post<{ status: string }>(`/pipeline/api/webhook-triggers/${webhookId}/process`, payload);
  }
}
