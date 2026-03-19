/**
 * Usage API
 */

import type { HarnessClient } from '../client.js';

export interface UsageMetrics {
  module: string;
  activeUsers?: number;
  totalExecutions?: number;
  activeServices?: number;
  period: string;
}

export class UsageAPI {
  constructor(private client: HarnessClient) {}

  async get(startTime: number, endTime: number, module?: string): Promise<UsageMetrics[]> {
    const queryParams: Record<string, string> = {
      startTime: startTime.toString(),
      endTime: endTime.toString(),
    };
    if (module) queryParams.module = module;
    return this.client.get<UsageMetrics[]>('/usage', queryParams);
  }

  async getLicense(): Promise<{ used: number; limit: number }> {
    return this.client.get<{ used: number; limit: number }>('/usage/license');
  }
}
