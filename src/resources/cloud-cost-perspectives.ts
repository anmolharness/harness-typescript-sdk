/**
 * Cloud Cost Perspectives API
 */

import type { HarnessClient } from '../client.js';
import type { CloudCostPerspective, PageResponse, ListQueryParams } from '../types/index.js';

export class CloudCostPerspectivesAPI {
  constructor(private client: HarnessClient) {}

  async list(params?: ListQueryParams): Promise<PageResponse<CloudCostPerspective>> {
    const queryParams: Record<string, string> = {
      pageIndex: params?.page?.toString() || '0',
      pageSize: params?.limit?.toString() || '50',
    };

    return this.client.get<PageResponse<CloudCostPerspective>>('/ccm/api/perspective', queryParams);
  }

  async get(perspectiveId: string): Promise<CloudCostPerspective> {
    return this.client.get<CloudCostPerspective>(`/ccm/api/perspective/${perspectiveId}`);
  }

  async create(data: Partial<CloudCostPerspective>): Promise<CloudCostPerspective> {
    return this.client.post<CloudCostPerspective>('/ccm/api/perspective', data);
  }

  async update(perspectiveId: string, data: Partial<CloudCostPerspective>): Promise<CloudCostPerspective> {
    return this.client.put<CloudCostPerspective>(`/ccm/api/perspective/${perspectiveId}`, data);
  }

  async delete(perspectiveId: string): Promise<boolean> {
    return this.client.delete<boolean>(`/ccm/api/perspective/${perspectiveId}`);
  }
}
