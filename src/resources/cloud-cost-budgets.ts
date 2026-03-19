/**
 * Cloud Cost Budgets API
 */

import type { HarnessClient } from '../client.js';
import type { CloudCostBudget, PageResponse, ListQueryParams } from '../types/index.js';

export class CloudCostBudgetsAPI {
  constructor(private client: HarnessClient) {}

  async list(params?: ListQueryParams): Promise<PageResponse<CloudCostBudget>> {
    const queryParams: Record<string, string> = {
      pageIndex: params?.page?.toString() || '0',
      pageSize: params?.limit?.toString() || '50',
    };

    return this.client.get<PageResponse<CloudCostBudget>>('/ccm/api/budgets', queryParams);
  }

  async get(budgetId: string): Promise<CloudCostBudget> {
    return this.client.get<CloudCostBudget>(`/ccm/api/budgets/${budgetId}`);
  }

  async create(data: Partial<CloudCostBudget>): Promise<CloudCostBudget> {
    return this.client.post<CloudCostBudget>('/ccm/api/budgets', data);
  }

  async update(budgetId: string, data: Partial<CloudCostBudget>): Promise<CloudCostBudget> {
    return this.client.put<CloudCostBudget>(`/ccm/api/budgets/${budgetId}`, data);
  }

  async delete(budgetId: string): Promise<boolean> {
    return this.client.delete<boolean>(`/ccm/api/budgets/${budgetId}`);
  }
}
