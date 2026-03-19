/**
 * SLOs API
 */

import type { HarnessClient } from '../client.js';
import type { SLO, PageResponse, ListQueryParams } from '../types/index.js';

export class SLOsAPI {
  constructor(private client: HarnessClient) {}

  async list(orgIdentifier: string, projectIdentifier: string, params?: ListQueryParams): Promise<PageResponse<SLO>> {
    const queryParams: Record<string, string> = {
      orgIdentifier,
      projectIdentifier,
      pageIndex: params?.page?.toString() || '0',
      pageSize: params?.limit?.toString() || '50',
    };

    return this.client.get<PageResponse<SLO>>('/cv/api/slo-dashboard/widgets/list', queryParams);
  }

  async get(orgIdentifier: string, projectIdentifier: string, identifier: string): Promise<SLO> {
    return this.client.get<SLO>(`/cv/api/slo/${identifier}`, {
      orgIdentifier,
      projectIdentifier,
    });
  }

  async create(data: Partial<SLO>): Promise<SLO> {
    return this.client.post<SLO>(
      '/cv/api/slo',
      { slo: data },
      {
        orgIdentifier: data.orgIdentifier!,
        projectIdentifier: data.projectIdentifier!,
      }
    );
  }

  async update(orgIdentifier: string, projectIdentifier: string, identifier: string, data: Partial<SLO>): Promise<SLO> {
    return this.client.put<SLO>(
      `/cv/api/slo/${identifier}`,
      { slo: data },
      { orgIdentifier, projectIdentifier }
    );
  }

  async delete(orgIdentifier: string, projectIdentifier: string, identifier: string): Promise<boolean> {
    return this.client.delete<boolean>(`/cv/api/slo/${identifier}`, {
      orgIdentifier,
      projectIdentifier,
    });
  }
}
