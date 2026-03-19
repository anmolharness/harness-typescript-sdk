/**
 * Input Sets API
 */

import type { HarnessClient } from '../client.js';
import type {
  InputSet,
  CreateInputSetRequest,
  UpdateInputSetRequest,
  PageResponse,
  ListQueryParams,
} from '../types/index.js';

export class InputSetsAPI {
  constructor(private client: HarnessClient) {}

  /**
   * List input sets
   */
  async list(
    orgIdentifier: string,
    projectIdentifier: string,
    pipelineIdentifier: string,
    params?: ListQueryParams
  ): Promise<PageResponse<InputSet>> {
    const queryParams: Record<string, string> = {
      orgIdentifier,
      projectIdentifier,
      pipelineIdentifier,
      page: params?.page?.toString() || '0',
      size: params?.limit?.toString() || '50',
    };

    if (params?.searchTerm) {
      queryParams.searchTerm = params.searchTerm;
    }

    return this.client.get<PageResponse<InputSet>>('/pipeline/api/inputSets', queryParams);
  }

  /**
   * Get input set by identifier
   */
  async get(
    orgIdentifier: string,
    projectIdentifier: string,
    pipelineIdentifier: string,
    identifier: string
  ): Promise<InputSet> {
    return this.client.get<InputSet>(`/pipeline/api/inputSets/${identifier}`, {
      orgIdentifier,
      projectIdentifier,
      pipelineIdentifier,
    });
  }

  /**
   * Create input set
   */
  async create(data: CreateInputSetRequest): Promise<InputSet> {
    return this.client.postYaml<InputSet>(
      '/pipeline/api/inputSets',
      data.yaml,
      {
        orgIdentifier: data.orgIdentifier,
        projectIdentifier: data.projectIdentifier,
        pipelineIdentifier: data.pipelineIdentifier,
      }
    );
  }

  /**
   * Update input set
   */
  async update(
    orgIdentifier: string,
    projectIdentifier: string,
    pipelineIdentifier: string,
    identifier: string,
    yaml: string
  ): Promise<InputSet> {
    return this.client.putYaml<InputSet>(
      `/pipeline/api/inputSets/${identifier}`,
      yaml,
      { orgIdentifier, projectIdentifier, pipelineIdentifier }
    );
  }

  /**
   * Delete input set
   */
  async delete(
    orgIdentifier: string,
    projectIdentifier: string,
    pipelineIdentifier: string,
    identifier: string
  ): Promise<boolean> {
    return this.client.delete<boolean>(`/pipeline/api/inputSets/${identifier}`, {
      orgIdentifier,
      projectIdentifier,
      pipelineIdentifier,
    });
  }
}
