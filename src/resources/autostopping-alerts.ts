/**
 * AutoStopping Alerts API
 */

import type { HarnessClient } from '../client.js';

export interface AutoStoppingAlert {
  id: number;
  name: string;
  ruleIds: number[];
  threshold: number;
  recipients: string[];
  enabled: boolean;
}

export class AutoStoppingAlertsAPI {
  constructor(private client: HarnessClient) {}

  async list(): Promise<AutoStoppingAlert[]> {
    return this.client.get<AutoStoppingAlert[]>('/gateway/lw/api/accounts/{accountId}/autostopping/alerts');
  }

  async create(data: Partial<AutoStoppingAlert>): Promise<AutoStoppingAlert> {
    return this.client.post<AutoStoppingAlert>('/gateway/lw/api/accounts/{accountId}/autostopping/alerts', data);
  }

  async delete(alertId: number): Promise<boolean> {
    return this.client.delete<boolean>(`/gateway/lw/api/accounts/{accountId}/autostopping/alerts/${alertId}`);
  }
}
