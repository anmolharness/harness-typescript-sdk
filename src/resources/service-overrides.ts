/**
 * Service Overrides API
 */

import type { HarnessClient } from '../client.js';
import type { PageResponse, ListQueryParams } from '../types/index.js';

export interface ServiceOverride {
  identifier: string;
  orgIdentifier: string;
  projectIdentifier: string;
  environmentRef: string;
  serviceRef?: string;
  infrastructureRef?: string;
  type: 'ENV_SERVICE_OVERRIDE' | 'ENV_GLOBAL_OVERRIDE' | 'INFRA_SERVICE_OVERRIDE' | 'INFRA_GLOBAL_OVERRIDE';
  yaml?: string;
  createdAt?: number;
  lastModifiedAt?: number;
}

export class ServiceOverridesAPI {
  constructor(private client: HarnessClient) {}

  async list(orgIdentifier: string, projectIdentifier: string, environmentIdentifier: string, params?: ListQueryParams): Promise<PageResponse<ServiceOverride>> {
    const queryParams: Record<string, string> = {
      orgIdentifier,
      projectIdentifier,
      environmentIdentifier,
      pageIndex: params?.page?.toString() || '0',
      pageSize: params?.limit?.toString() || '50',
    };
    return this.client.get<PageResponse<ServiceOverride>>('/serviceOverrides', queryParams);
  }

  async create(data: Partial<ServiceOverride>): Promise<ServiceOverride> {
    return this.client.postYaml<ServiceOverride>('/serviceOverrides', data.yaml!, {
      orgIdentifier: data.orgIdentifier!,
      projectIdentifier: data.projectIdentifier!,
      environmentIdentifier: data.environmentRef!,
    });
  }

  async delete(orgIdentifier: string, projectIdentifier: string, environmentIdentifier: string, identifier: string): Promise<boolean> {
    return this.client.delete<boolean>(`/serviceOverrides/${identifier}`, {
      orgIdentifier,
      projectIdentifier,
      environmentIdentifier,
    });
  }
}
