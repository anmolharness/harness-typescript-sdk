/**
 * Execution Details API
 */

import type { HarnessClient } from '../client.js';

export interface ExecutionDetails {
  planExecutionId: string;
  status: string;
  startTs?: number;
  endTs?: number;
  pipelineIdentifier?: string;
  stagesExecution?: unknown[];
  executionGraph?: unknown;
}

export class ExecutionDetailsAPI {
  constructor(private client: HarnessClient) {}

  async get(planExecutionId: string, orgIdentifier: string, projectIdentifier: string): Promise<ExecutionDetails> {
    return this.client.get<ExecutionDetails>(`/pipeline/api/pipelines/execution/${planExecutionId}/details`, {
      orgIdentifier,
      projectIdentifier,
    });
  }

  async getGraph(planExecutionId: string, orgIdentifier: string, projectIdentifier: string): Promise<unknown> {
    return this.client.get<unknown>(`/pipeline/api/pipelines/execution/${planExecutionId}/graph`, {
      orgIdentifier,
      projectIdentifier,
    });
  }
}
