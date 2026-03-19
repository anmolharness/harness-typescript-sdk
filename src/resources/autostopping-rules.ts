/**
 * AutoStopping Rules API
 */

import type { HarnessClient } from '../client.js';
import type { AutoStoppingRule, PageResponse, ListQueryParams } from '../types/index.js';

export class AutoStoppingRulesAPI {
  constructor(private client: HarnessClient) {}

  async list(cloudAccountId?: string, params?: ListQueryParams): Promise<PageResponse<AutoStoppingRule>> {
    const queryParams: Record<string, string> = {
      page: params?.page?.toString() || '0',
      limit: params?.limit?.toString() || '50',
    };

    if (cloudAccountId) {
      queryParams.cloud_account_id = cloudAccountId;
    }

    return this.client.get<PageResponse<AutoStoppingRule>>('/gateway/lw/api/accounts/{accountId}/autostopping/rules', queryParams);
  }

  async get(ruleId: number): Promise<AutoStoppingRule> {
    return this.client.get<AutoStoppingRule>(`/gateway/lw/api/accounts/{accountId}/autostopping/rules/${ruleId}`);
  }

  async create(data: Partial<AutoStoppingRule>): Promise<AutoStoppingRule> {
    return this.client.post<AutoStoppingRule>('/gateway/lw/api/accounts/{accountId}/autostopping/rules', data);
  }

  async update(ruleId: number, data: Partial<AutoStoppingRule>): Promise<AutoStoppingRule> {
    return this.client.put<AutoStoppingRule>(`/gateway/lw/api/accounts/{accountId}/autostopping/rules/${ruleId}`, data);
  }

  async delete(ruleId: number): Promise<boolean> {
    return this.client.delete<boolean>(`/gateway/lw/api/accounts/{accountId}/autostopping/rules/${ruleId}`);
  }

  async toggle(ruleId: number, disabled: boolean): Promise<AutoStoppingRule> {
    return this.client.post<AutoStoppingRule>(`/gateway/lw/api/accounts/{accountId}/autostopping/rules/${ruleId}/toggle`, { disabled });
  }
}
