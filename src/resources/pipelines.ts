/**
 * Pipelines API
 */

import type { HarnessClient } from '../client.js';
import type {
  Pipeline,
  CreatePipelineRequest,
  UpdatePipelineRequest,
  ExecutePipelineRequest,
  PipelineExecution,
  PageResponse,
  ListQueryParams,
} from '../types/index.js';

export class PipelinesAPI {
  constructor(private client: HarnessClient) {}

  /**
   * List pipelines
   */
  async list(
    orgIdentifier: string,
    projectIdentifier: string,
    params?: ListQueryParams
  ): Promise<PageResponse<Pipeline>> {
    const queryParams: Record<string, string> = {
      orgIdentifier,
      projectIdentifier,
      page: params?.page?.toString() || '0',
      size: params?.limit?.toString() || '50',
    };

    if (params?.searchTerm) {
      queryParams.searchTerm = params.searchTerm;
    }

    return this.client.get<PageResponse<Pipeline>>('/pipeline/api/pipelines/list', queryParams);
  }

  /**
   * Get pipeline by identifier
   */
  async get(orgIdentifier: string, projectIdentifier: string, identifier: string): Promise<Pipeline> {
    return this.client.get<Pipeline>(`/pipeline/api/pipelines/v2/${identifier}`, {
      orgIdentifier,
      projectIdentifier,
    });
  }

  /**
   * Create pipeline
   */
  async create(data: CreatePipelineRequest): Promise<Pipeline> {
    return this.client.postYaml<Pipeline>(
      '/pipeline/api/pipelines/v2',
      data.yaml,
      {
        orgIdentifier: data.orgIdentifier,
        projectIdentifier: data.projectIdentifier,
      }
    );
  }

  /**
   * Update pipeline
   */
  async update(
    orgIdentifier: string,
    projectIdentifier: string,
    identifier: string,
    yaml: string
  ): Promise<Pipeline> {
    return this.client.putYaml<Pipeline>(
      `/pipeline/api/pipelines/v2/${identifier}`,
      yaml,
      { orgIdentifier, projectIdentifier }
    );
  }

  /**
   * Delete pipeline
   */
  async delete(orgIdentifier: string, projectIdentifier: string, identifier: string): Promise<boolean> {
    return this.client.delete<boolean>(`/pipeline/api/pipelines/${identifier}`, {
      orgIdentifier,
      projectIdentifier,
    });
  }

  /**
   * Execute pipeline
   */
  async execute(
    orgIdentifier: string,
    projectIdentifier: string,
    identifier: string,
    data?: ExecutePipelineRequest
  ): Promise<PipelineExecution> {
    return this.client.post<PipelineExecution>(
      `/pipeline/api/pipelines/execute/${identifier}`,
      data,
      { orgIdentifier, projectIdentifier }
    );
  }

  /**
   * Get pipeline execution
   */
  async getExecution(
    orgIdentifier: string,
    projectIdentifier: string,
    planExecutionId: string
  ): Promise<PipelineExecution> {
    return this.client.get<PipelineExecution>(`/pipeline/api/pipelines/execution/${planExecutionId}`, {
      orgIdentifier,
      projectIdentifier,
    });
  }
}
