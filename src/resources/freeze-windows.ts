/**
 * Freeze Windows API
 */

import type { HarnessClient } from '../client.js';
import type { FreezeWindow, CreateFreezeWindowRequest, PageResponse, ListQueryParams } from '../types/index.js';

export class FreezeWindowsAPI {
  constructor(private client: HarnessClient) {}

  /**
   * List freeze windows
   */
  async list(orgIdentifier?: string, projectIdentifier?: string, params?: ListQueryParams): Promise<PageResponse<FreezeWindow>> {
    const queryParams: Record<string, string> = {
      page: params?.page?.toString() || '0',
      size: params?.limit?.toString() || '50',
    };

    if (orgIdentifier) {
      queryParams.orgIdentifier = orgIdentifier;
    }

    if (projectIdentifier) {
      queryParams.projectIdentifier = projectIdentifier;
    }

    return this.client.post<PageResponse<FreezeWindow>>('/freeze/api/freezes/list', {}, queryParams);
  }

  /**
   * Get freeze window
   */
  async get(identifier: string, orgIdentifier?: string, projectIdentifier?: string): Promise<FreezeWindow> {
    const queryParams: Record<string, string> = {};

    if (orgIdentifier) {
      queryParams.orgIdentifier = orgIdentifier;
    }

    if (projectIdentifier) {
      queryParams.projectIdentifier = projectIdentifier;
    }

    return this.client.get<FreezeWindow>(`/freeze/api/freezes/${identifier}`, queryParams);
  }

  /**
   * Create freeze window
   */
  async create(data: CreateFreezeWindowRequest): Promise<FreezeWindow> {
    const queryParams: Record<string, string> = {};

    if (data.orgIdentifier) {
      queryParams.orgIdentifier = data.orgIdentifier;
    }

    if (data.projectIdentifier) {
      queryParams.projectIdentifier = data.projectIdentifier;
    }

    if (data.yaml) {
      return this.client.postYaml<FreezeWindow>('/freeze/api/freezes', data.yaml, queryParams);
    }

    return this.client.post<FreezeWindow>('/freeze/api/freezes', { freeze: data }, queryParams);
  }

  /**
   * Update freeze window
   */
  async update(identifier: string, yaml: string, orgIdentifier?: string, projectIdentifier?: string): Promise<FreezeWindow> {
    const queryParams: Record<string, string> = {};

    if (orgIdentifier) {
      queryParams.orgIdentifier = orgIdentifier;
    }

    if (projectIdentifier) {
      queryParams.projectIdentifier = projectIdentifier;
    }

    return this.client.putYaml<FreezeWindow>(`/freeze/api/freezes/${identifier}`, yaml, queryParams);
  }

  /**
   * Delete freeze window
   */
  async delete(identifier: string, orgIdentifier?: string, projectIdentifier?: string): Promise<boolean> {
    const queryParams: Record<string, string> = {};

    if (orgIdentifier) {
      queryParams.orgIdentifier = orgIdentifier;
    }

    if (projectIdentifier) {
      queryParams.projectIdentifier = projectIdentifier;
    }

    return this.client.delete<boolean>(`/freeze/api/freezes/${identifier}`, queryParams);
  }

  /**
   * Get global freeze status
   */
  async getGlobalFreezeStatus(orgIdentifier?: string, projectIdentifier?: string): Promise<{ frozen: boolean }> {
    const queryParams: Record<string, string> = {};

    if (orgIdentifier) {
      queryParams.orgIdentifier = orgIdentifier;
    }

    if (projectIdentifier) {
      queryParams.projectIdentifier = projectIdentifier;
    }

    return this.client.get<{ frozen: boolean }>('/freeze/api/freezes/global-freeze', queryParams);
  }
}
