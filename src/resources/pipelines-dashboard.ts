/**
 * Pipelines Dashboard API
 */

import type { HarnessClient } from '../client.js';

export interface PipelineDashboardMetrics {
  totalExecutions?: number;
  successRate?: number;
  failureRate?: number;
  avgExecutionTime?: number;
  deploymentFrequency?: number;
}

export class PipelinesDashboardAPI {
  constructor(private client: HarnessClient) {}

  async getMetrics(orgIdentifier: string, projectIdentifier: string, startTime: number, endTime: number): Promise<PipelineDashboardMetrics> {
    return this.client.post<PipelineDashboardMetrics>('/pipeline/api/pipelines/dashboard', {
      orgIdentifier,
      projectIdentifier,
      startTime,
      endTime,
    });
  }

  async getHealthScore(orgIdentifier: string, projectIdentifier: string): Promise<{ score: number }> {
    return this.client.get<{ score: number }>('/pipeline/api/pipelines/dashboard/health', {
      orgIdentifier,
      projectIdentifier,
    });
  }
}
