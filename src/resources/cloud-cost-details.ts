/**
 * Cloud Cost Details API
 */

import type { HarnessClient } from '../client.js';

export interface CostDetails {
  totalCost: number;
  breakdown: Array<{
    service?: string;
    cost: number;
    trend?: number;
  }>;
  startTime: number;
  endTime: number;
}

export class CloudCostDetailsAPI {
  constructor(private client: HarnessClient) {}

  async getCostBreakdown(startTime: number, endTime: number, groupBy?: string[]): Promise<CostDetails> {
    return this.client.post<CostDetails>('/ccm/api/cost/details', {
      startTime,
      endTime,
      groupBy,
    });
  }

  async getServiceCosts(startTime: number, endTime: number): Promise<CostDetails> {
    return this.client.post<CostDetails>('/ccm/api/cost/details/services', {
      startTime,
      endTime,
    });
  }
}
