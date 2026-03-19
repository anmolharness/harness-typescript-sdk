/**
 * Environment Groups API
 */

import type { HarnessClient } from '../client.js';
import type { PageResponse, ListQueryParams } from '../types/index.js';

export interface EnvironmentGroup {
  identifier: string;
  orgIdentifier: string;
  projectIdentifier: string;
  name: string;
  description?: string;
  envIdentifiers: string[];
  tags?: Record<string, string>;
  yaml?: string;
  createdAt?: number;
  lastModifiedAt?: number;
}

export class EnvironmentGroupsAPI {
  constructor(private client: HarnessClient) {}

  async list(orgIdentifier: string, projectIdentifier: string, params?: ListQueryParams): Promise<PageResponse<EnvironmentGroup>> {
    const queryParams: Record<string, string> = {
      orgIdentifier,
      projectIdentifier,
      pageIndex: params?.page?.toString() || '0',
      pageSize: params?.limit?.toString() || '50',
    };
    return this.client.get<PageResponse<EnvironmentGroup>>('/environmentGroup', queryParams);
  }

  async get(orgIdentifier: string, projectIdentifier: string, identifier: string): Promise<EnvironmentGroup> {
    return this.client.get<EnvironmentGroup>(`/environmentGroup/${identifier}`, { orgIdentifier, projectIdentifier });
  }

  async create(data: Partial<EnvironmentGroup>): Promise<EnvironmentGroup> {
    return this.client.postYaml<EnvironmentGroup>('/environmentGroup', data.yaml!, {
      orgIdentifier: data.orgIdentifier!,
      projectIdentifier: data.projectIdentifier!,
    });
  }

  async update(orgIdentifier: string, projectIdentifier: string, identifier: string, yaml: string): Promise<EnvironmentGroup> {
    return this.client.putYaml<EnvironmentGroup>(`/environmentGroup/${identifier}`, yaml, { orgIdentifier, projectIdentifier });
  }

  async delete(orgIdentifier: string, projectIdentifier: string, identifier: string): Promise<boolean> {
    return this.client.delete<boolean>(`/environmentGroup/${identifier}`, { orgIdentifier, projectIdentifier });
  }
}
