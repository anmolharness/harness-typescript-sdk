/**
 * Filters API
 */

import type { HarnessClient } from '../client.js';
import type { Filter, PageResponse, ListQueryParams } from '../types/index.js';

export class FiltersAPI {
  constructor(private client: HarnessClient) {}

  async list(filterType: string, orgIdentifier?: string, projectIdentifier?: string, params?: ListQueryParams): Promise<PageResponse<Filter>> {
    const queryParams: Record<string, string> = {
      type: filterType,
      pageIndex: params?.page?.toString() || '0',
      pageSize: params?.limit?.toString() || '50',
    };

    if (orgIdentifier) {
      queryParams.orgIdentifier = orgIdentifier;
    }

    if (projectIdentifier) {
      queryParams.projectIdentifier = projectIdentifier;
    }

    return this.client.get<PageResponse<Filter>>('/filters', queryParams);
  }

  async get(identifier: string, filterType: string, orgIdentifier?: string, projectIdentifier?: string): Promise<Filter> {
    const queryParams: Record<string, string> = {
      type: filterType,
    };

    if (orgIdentifier) {
      queryParams.orgIdentifier = orgIdentifier;
    }

    if (projectIdentifier) {
      queryParams.projectIdentifier = projectIdentifier;
    }

    return this.client.get<Filter>(`/filters/${identifier}`, queryParams);
  }

  async create(data: Partial<Filter>): Promise<Filter> {
    const queryParams: Record<string, string> = {};

    if (data.orgIdentifier) {
      queryParams.orgIdentifier = data.orgIdentifier;
    }

    if (data.projectIdentifier) {
      queryParams.projectIdentifier = data.projectIdentifier;
    }

    return this.client.post<Filter>('/filters', { filter: data }, queryParams);
  }

  async delete(identifier: string, filterType: string, orgIdentifier?: string, projectIdentifier?: string): Promise<boolean> {
    const queryParams: Record<string, string> = {
      type: filterType,
    };

    if (orgIdentifier) {
      queryParams.orgIdentifier = orgIdentifier;
    }

    if (projectIdentifier) {
      queryParams.projectIdentifier = projectIdentifier;
    }

    return this.client.delete<boolean>(`/filters/${identifier}`, queryParams);
  }
}
