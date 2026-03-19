/**
 * AutoStopping Rules V2 API
 */

import type { HarnessClient } from '../client.js';

export interface AutoStoppingRuleV2 {
  id: number;
  name: string;
  version: 'v2';
  cloudProvider: string;
  resources: unknown[];
  configuration: unknown;
  enabled: boolean;
}

export class AutoStoppingRulesV2API {
  constructor(private client: HarnessClient) {}

  async list(): Promise<AutoStoppingRuleV2[]> {
    return this.client.get<AutoStoppingRuleV2[]>('/gateway/lw/api/v2/accounts/{accountId}/autostopping/rules');
  }

  async create(data: Partial<AutoStoppingRuleV2>): Promise<AutoStoppingRuleV2> {
    return this.client.post<AutoStoppingRuleV2>('/gateway/lw/api/v2/accounts/{accountId}/autostopping/rules', data);
  }

  async update(ruleId: number, data: Partial<AutoStoppingRuleV2>): Promise<AutoStoppingRuleV2> {
    return this.client.put<AutoStoppingRuleV2>(`/gateway/lw/api/v2/accounts/{accountId}/autostopping/rules/${ruleId}`, data);
  }
}
