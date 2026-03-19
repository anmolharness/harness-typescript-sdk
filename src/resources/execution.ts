/**
 * Execution API
 */

import type { HarnessClient } from '../client.js';
import type { PageResponse } from '../types/index.js';

export interface Execution {
  planExecutionId: string;
  status: string;
  startTs?: number;
  endTs?: number;
  executionUrl?: string;
  pipelineIdentifier?: string;
  orgIdentifier?: string;
  projectIdentifier?: string;
}

export class ExecutionAPI {
  constructor(private client: HarnessClient) {}

  async list(orgIdentifier: string, projectIdentifier: string, pipelineIdentifier?: string, page?: number, limit?: number): Promise<PageResponse<Execution>> {
    const queryParams: Record<string, string> = {
      orgIdentifier,
      projectIdentifier,
      page: page?.toString() || '0',
      size: limit?.toString() || '50',
    };
    if (pipelineIdentifier) queryParams.pipelineIdentifier = pipelineIdentifier;
    return this.client.post<PageResponse<Execution>>('/pipeline/api/pipelines/execution/summary', {}, queryParams);
  }

  async get(planExecutionId: string, orgIdentifier: string, projectIdentifier: string): Promise<Execution> {
    return this.client.get<Execution>(`/pipeline/api/pipelines/execution/${planExecutionId}`, {
      orgIdentifier,
      projectIdentifier,
    });
  }

  async stop(planExecutionId: string, orgIdentifier: string, projectIdentifier: string): Promise<Execution> {
    return this.client.post<Execution>(`/pipeline/api/pipelines/execution/${planExecutionId}/interrupt`, {}, {
      orgIdentifier,
      projectIdentifier,
    });
  }

  async retry(planExecutionId: string, orgIdentifier: string, projectIdentifier: string): Promise<Execution> {
    return this.client.post<Execution>(`/pipeline/api/pipelines/execution/${planExecutionId}/retry`, {}, {
      orgIdentifier,
      projectIdentifier,
    });
  }
}
