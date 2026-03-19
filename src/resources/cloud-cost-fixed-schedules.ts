/**
 * Cloud Cost AutoStopping Fixed Schedules API
 */

import type { HarnessClient } from '../client.js';

export interface FixedSchedule {
  id: number;
  name: string;
  schedule: {
    type: 'uptime' | 'downtime';
    beginTime?: string;
    endTime?: string;
    timezone?: string;
    daysOfWeek?: string[];
  };
  resources?: number[];
}

export class CloudCostFixedSchedulesAPI {
  constructor(private client: HarnessClient) {}

  async list(ruleId: number): Promise<FixedSchedule[]> {
    return this.client.get<FixedSchedule[]>(`/gateway/lw/api/accounts/{accountId}/autostopping/rules/${ruleId}/schedules`);
  }

  async create(ruleId: number, data: Partial<FixedSchedule>): Promise<FixedSchedule> {
    return this.client.post<FixedSchedule>(`/gateway/lw/api/accounts/{accountId}/autostopping/rules/${ruleId}/schedules`, data);
  }

  async delete(ruleId: number, scheduleId: number): Promise<boolean> {
    return this.client.delete<boolean>(`/gateway/lw/api/accounts/{accountId}/autostopping/rules/${ruleId}/schedules/${scheduleId}`);
  }
}
