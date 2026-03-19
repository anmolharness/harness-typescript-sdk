/**
 * Triggers API
 */

import type { HarnessClient } from '../client.js';
import type {
  Trigger,
  CreateTriggerRequest,
  UpdateTriggerRequest,
  PageResponse,
  ListQueryParams,
} from '../types/index.js';

export class TriggersAPI {
  constructor(private client: HarnessClient) {}

  /**
   * List triggers
   */
  async list(
    orgIdentifier: string,
    projectIdentifier: string,
    targetIdentifier: string,
    params?: ListQueryParams
  ): Promise<PageResponse<Trigger>> {
    const queryParams: Record<string, string> = {
      orgIdentifier,
      projectIdentifier,
      targetIdentifier,
      page: params?.page?.toString() || '0',
      size: params?.limit?.toString() || '50',
    };

    if (params?.searchTerm) {
      queryParams.searchTerm = params.searchTerm;
    }

    return this.client.get<PageResponse<Trigger>>('/pipeline/api/triggers', queryParams);
  }

  /**
   * Get trigger by identifier
   */
  async get(
    orgIdentifier: string,
    projectIdentifier: string,
    targetIdentifier: string,
    identifier: string
  ): Promise<Trigger> {
    return this.client.get<Trigger>(`/pipeline/api/triggers/${identifier}`, {
      orgIdentifier,
      projectIdentifier,
      targetIdentifier,
    });
  }

  /**
   * Create trigger
   */
  async create(data: CreateTriggerRequest): Promise<Trigger> {
    return this.client.postYaml<Trigger>(
      '/pipeline/api/triggers',
      data.yaml,
      {
        orgIdentifier: data.orgIdentifier,
        projectIdentifier: data.projectIdentifier,
        targetIdentifier: data.targetIdentifier,
      }
    );
  }

  /**
   * Update trigger
   */
  async update(
    orgIdentifier: string,
    projectIdentifier: string,
    targetIdentifier: string,
    identifier: string,
    yaml: string
  ): Promise<Trigger> {
    return this.client.putYaml<Trigger>(
      `/pipeline/api/triggers/${identifier}`,
      yaml,
      { orgIdentifier, projectIdentifier, targetIdentifier }
    );
  }

  /**
   * Delete trigger
   */
  async delete(
    orgIdentifier: string,
    projectIdentifier: string,
    targetIdentifier: string,
    identifier: string
  ): Promise<boolean> {
    return this.client.delete<boolean>(`/pipeline/api/triggers/${identifier}`, {
      orgIdentifier,
      projectIdentifier,
      targetIdentifier,
    });
  }

  /**
   * Enable/disable trigger
   */
  async updateStatus(
    orgIdentifier: string,
    projectIdentifier: string,
    targetIdentifier: string,
    identifier: string,
    enabled: boolean
  ): Promise<Trigger> {
    return this.client.put<Trigger>(
      `/pipeline/api/triggers/${identifier}/${enabled ? 'enable' : 'disable'}`,
      {},
      { orgIdentifier, projectIdentifier, targetIdentifier }
    );
  }
}
