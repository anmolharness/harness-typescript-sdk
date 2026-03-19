/**
 * Secret Managers API
 */

import type { HarnessClient } from '../client.js';
import type { PageResponse, ListQueryParams } from '../types/index.js';

export interface SecretManager {
  identifier: string;
  orgIdentifier?: string;
  projectIdentifier?: string;
  name: string;
  type: string;
  spec: unknown;
}

export class SecretManagersAPI {
  constructor(private client: HarnessClient) {}

  async list(orgIdentifier?: string, projectIdentifier?: string, params?: ListQueryParams): Promise<PageResponse<SecretManager>> {
    const queryParams: Record<string, string> = {
      pageIndex: params?.page?.toString() || '0',
      pageSize: params?.limit?.toString() || '50',
    };
    if (orgIdentifier) queryParams.orgIdentifier = orgIdentifier;
    if (projectIdentifier) queryParams.projectIdentifier = projectIdentifier;
    return this.client.get<PageResponse<SecretManager>>('/ng/api/secret-managers', queryParams);
  }

  async get(identifier: string, orgIdentifier?: string, projectIdentifier?: string): Promise<SecretManager> {
    const queryParams: Record<string, string> = {};
    if (orgIdentifier) queryParams.orgIdentifier = orgIdentifier;
    if (projectIdentifier) queryParams.projectIdentifier = projectIdentifier;
    return this.client.get<SecretManager>(`/ng/api/secret-managers/${identifier}`, queryParams);
  }
}
